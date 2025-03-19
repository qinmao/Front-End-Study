# ts 装饰器
TypeScript 中的装饰器是一种用于增强类、方法、属性等功能的特殊语法。
装饰器类型分成类装饰器、方法装饰器、访问器装饰器、属性装饰器、参数装饰器

## 装饰器的版本
TypeScript 从早期开始，就支持装饰器。但是，装饰器的语法后来发生了变化。ECMAScript 标准委员会最终通过的语法标准，与 TypeScript 早期使用的语法有很大差异。
目前，TypeScript 5.0 同时支持两种装饰器语法。标准语法可以直接使用，传统语法需要打--experimentalDecorators编译参数。

## 类装饰器
* 应用于类构造函数，用于修改或替换类定义。
* 定义：它是一个函数，使用时会接收到 value 和 context 两个参数
  - value：所装饰的对象。
  - context：上下文对象
  ```ts
    type Decorator = (
        value: DecoratedValue,
        context: {
            kind: string;
            name: string | symbol;
            addInitializer?(initializer: () => void): void;
            static?: boolean;
            private?: boolean;
            access: {
                get?(): unknown;
                set?(value: unknown): void;
            };
        }
    ) => void | ReplacementValue;
  ```
  ```ts
    function Greeter(value, context) {
        if (context.kind === 'class') {
                value.prototype.greet = function () {
                console.log('你好');
            };
        }
    }
    @Greeter
    class User {}

    const user = new User();
    user.greet(); // "你好"

  ```
* nestjs 中类装饰器
  - @Module() 定义模块，组织代码结构：
  ```ts
    @Module({
        controllers: [UserController],  // 注册控制器
        providers: [UserService],       // 注册服务（可注入的类）
        imports: [OtherModule],         // 导入其他模块
    })
    export class UserModule {}
  ```
  - @Controller() 定义 RESTful 控制器，指定路由前缀：
    ```ts
    @Controller('users')  // 路由前缀为 /users
    export class UserController {
        @Get()              // 具体路由为 GET /users
        getAllUsers() {}
    }
    ```
  - @Injectable() 标记一个类为可注入的服务（供依赖注入使用）：
    ```ts
    @Injectable()
    export class UserService {
        constructor(private readonly logger: Logger) {} // 依赖注入
    }
    ```
    
## 方法装饰器
* 修改类方法的行为（如日志、拦截）。
* 定义：是一个函数，它接收三个参数
  - target：被装饰的类的原型对象。
  - propertyKey：被装饰的方法的名称。
  - descriptor：属性描述符对象,描述了被装饰方法的特性,有如下值。
    - value：属性的值。
    - writable：如果为 true，则属性的值可以被修改。
    - enumerable：如果为 true，则属性会出现在对象的枚举属性中。
    - configurable：如果为 true，则属性描述符可以被修改，属性也可以被删除。
    - get：一个返回属性值的 getter 函数。
    - set：一个设置属性值的 setter 函数。
  ```ts
    function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // 保存原始方法
        const originalMethod = descriptor.value;
        // 将 descriptor.value 修改为一个新的函数,在执行原方法前执行一些行为
        descriptor.value = function (...args: any[]) {
            console.log(`Called ${propertyKey} with args: ${JSON.stringify(args)}`);
            return originalMethod.apply(this, args);
        };
        // 返回修改后的描述符
        return descriptor;
    }

    class User { 
        @log 
        myMethod(arg1: string, arg2: number) {
            console.log(`Executing myMethod with ${arg1} and ${arg2}`);
        }
    }
    const user = new User();
    user.myMethod('test', 42);
    // 输出:
    // Called myMethod with args: ["test",42]
    // Executing myMethod with test and 42
  ```
* nestjs 中方法装饰器
  - HTTP 方法装饰器：定义路由和 HTTP 方法（如 @Get(), @Post(), @Put(), @Delete()）：
  ```ts
    @Controller('users')
    export class UserController {
        @Get('profile')  // GET /users/profile
        getProfile() {}

        @Post()          // POST /users
        createUser() {}
    }
  ```
  - @UseGuards() 添加路由守卫（权限验证）：
   ```ts
    @Controller('users')
    export class UserController {
        @UseGuards(JwtAuthGuard)  // 只有携带有效 JWT 的请求才能访问
        @Get('profile')
        getProfile() {}
    }
   ```
  - @UseInterceptors() 添加拦截器（日志、缓存等）：
   ```ts
    @UseInterceptors(LoggingInterceptor)  // 记录请求日志
    @Get()
    getAllUsers() {}
   ```

## 属性装饰器：
* 用于类的属性（常用于添加元数据）。
* 定义：是一个函数，它接收两个参数：
   - target：被装饰的类的原型对象。
   - propertyKey：被装饰的属性的名称
  ```ts
    import "reflect-metadata"; // Reflect.defineMetadata 方法来自该库
    // defineMetadata 用于在目标对象上定义元数据。
    // Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    
    // getMetadata 用于从目标对象上获取元数据。
    // Reflect.getMetadata(metadataKey, target, propertyKey);

    // 应用场景
    // 数据验证:添加元数据,标记属性需要满足的规则（如最小长度、非空等）。
    function Validate(min: number) {
        return (target: any, propertyKey: string) => {
            Reflect.defineMetadata("validation:min", min, target, propertyKey);
        };
    }
    class User {
        // @Validate(18) 装饰器应用于 age 属性，表示 age 属性的最小值为 18
        @Validate(18)
        age: number;
    }
    constructor(age: number) {
        this.age = age;
    }
    // 创建实例
    const user = new User(20);

    function validateUser(user: User) {
        const minAge = Reflect.getMetadata("validation:min", User.prototype, "age");
        if (user.age < minAge) {
            console.log(`Age must be at least ${minAge}`);
        } else {
            console.log("Age is valid");
        }
    }
    validateUser(user); // 输出: Age is valid

    const anotherUser = new User(16);
    validateUser(anotherUser); // 输出: Age must be at least 18
  ```
* NestJS 属性装饰器
  - @Inject() 用于显式指定依赖注入的标识符
  ```ts
    import { Injectable, Inject } from '@nestjs/common';

    @Injectable()
    export class UserService {
        constructor(@Inject('Logger') private readonly logger: Logger) {}
    }
  ```
  - @Optional() 用于标记依赖项为可选
  ```ts
    import { Injectable, Optional } from '@nestjs/common';

    @Injectable()
    export class UserService {
        constructor(@Optional() private readonly logger?: Logger) {}
    }
  ```
  - @IsNotEmpty()
  ```ts
    class UserDTo{
        @IsNotEmpty({
            message: 'account 不能为空',
        })
        account: string;
    }
  ```

## 参数装饰器
* 应用于方法或构造函数的参数
* 定义：是一个函数，接收三个参数
  - target：被装饰的类的原型对象。
  - propertyKey：被装饰的方法的名称。
  - parameterIndex：参数在函数参数列表中的索引。
  ```ts
    // 定义一个参数装饰器
    function LogParameter(target: any, methodName: string, parameterIndex: number) {
        console.log(`参数装饰器应用在：
        - 类：${target.constructor.name}
        - 方法：${methodName}
        - 参数索引：${parameterIndex}`);
    }

    class ExampleClass {
        // 应用参数装饰器到方法的参数上
        greet(@LogParameter name: string): void {
            console.log(`Hello, ${name}!`);
        }
    }
    // 实例化并调用方法
    const example = new ExampleClass();
    example.greet("TypeScript");

    //参数装饰器应用在：
    //- 类：ExampleClass
    //- 方法：greet
    //- 参数索引：0
    //Hello, TypeScript!
  ```
  
## 执行顺序
* 同一目标：装饰器按从下到上（从右到左）的顺序执行。
* 不同类型：参数装饰器 → 方法/属性/访问器 → 类装饰器。
```ts
    @first()
    @second()
    class Example {} // 先执行 second，再执行 first。
```