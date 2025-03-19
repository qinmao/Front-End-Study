# nestjs
> 基于 typescript 的 nodejs 企业级框架
## 特点
* 大而全
* 单例模式，依赖注入
* 统一的异常处理
* 面向切面编程（AOP）
* 支持Typescript(引入了很多的高级语法)

## 安装
  ```bash
  npm i -g @nestjs/cli  # 全局安装 Nest
  nest new project-name  # 生成模版项目
  ```

## nest-cli 常用命令
 ```bash 
  nest -v 
  nest -h
  # 生成一个rest风格的 usesr CRUD
  nest g res user
  # 生成在指定目录下
  nest g res user-center/user
 ```
* 创建顺序
  - 先创建 Module ->  Controller -> Service
  - 这样创建出来的文件在 Module 中自动注册，反之，后创建 Module, Controller 和 Service,会被注册到外层的 app.module.ts
* nest-cli.json 配置文件设置
  - spec:false 自动生成不产出测试文件
  ```json
    {
    "compilerOptions": {
      "deleteOutDir": true,
    },
    
    "generateOptions": {
      "spec": false
    }
  }

  ```

## 核心库
* @nestjs/cli
* @nestjs/core 
* @nestjs/common 
* rxjs 
* reflect-metadata

## 请求过程
* DTO（数据传输对象）
  - 全称是 data transfer object,他是一个对象，用于封装数据并将其从一个应用发送到另一个应用。DTO 帮助我们定义系统内的接口或者输入输出
  - dto 文件以.dto来命名方便识别
  ```ts
    // CreateUserDto.ts
    export class CreateUserDto{
      readonly name:string;
      // 可选
      readonly avatar?:string;
    }

    @Controller('user')
    export class UserController {
      constructor(private readonly userService: UserService) {}

      @Post('create')
      async create(@Body() createUserDto: CreateUserDto) {
        const { id } = await this.userService.create(createUserDto);
        return id;
      }

      @Post('update')
      update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto
      ) {
        // console.log(typeof id);
        return updateUseroDto;
      }
    }
  ```
* 请求数据验证
  > 引入管道(Pipe),管道是具有 @Injectable() 装饰器的类。管道应实现 PipeTransform 接口 它会在请求到达 Controller 之前被调用，如果抛出了异常，则不会再传递给 Controller。 两个典型的应用场景：转换、验证，做数据验证做两件事  
  - 第一步在 main.ts 中 开起全局验证
    ```ts
      function bootstrap(){
        const app = await NestFactory.create<NestExpressApplication>(AppModule);
        // 开启全局管道参数验证
        app.useGlobalPipes(
          new ValidationPipe({
            // 开启白名单，并且自动删除不在dto 中的多余属性 
            whitelist: true,
            // 不在dto实体中的属性，报错并列出
            forbidNonWhitelisted: true,
            // transform 实例转换，同时把网络传输中的 string——>number 转换，对性能有轻微的影响
            transform: true,
            transformOptions: {
              enableImplicitConversion: true,
            },
          }),
        );
      }

    ```
  - 第二步安装两个插件 
    ```bash
      # class-validation 包含一些验证规则
      npm i class-validation class-transformer
    ```
    ```ts
    // CreateUserDto.ts
    import { IsNotEmpty, IsPhoneNumber, IsOptional,Length } from 'class-validator';
    export class CreateUserDto{
      @ApiProperty({
        example: '小茂',
        description: '姓名',
      })
      @IsNotEmpty({
        message: 'userName 不能为空',
      })
      @Length(100)
      @IsString()
      userName: string;

      // 可选参数的验证
      @IsPhoneNumber('CN', {
        message: 'phone 不是一个电话号码',
      })
      @IsOptional()
      phone?: string;
    }
    // 批量添加数组的验证
    
    ```
* 自定义验证装饰器
  ```ts
  import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
  export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isLongerThan',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            return typeof value === 'string' && typeof relatedValue === 'string' && value.length > relatedValue.length; // you can return a Promise<boolean> here as well, if you want to make async validation
          },
        },
      });
    };
  }
  ```
* 更新操作面临实体重复属性的问题？
  - 解决的方法
  ```ts
  import { PartialType } from '@nestjs/swagger';
  import { CreateUserDto } from './create-user.dto';

  export class UpdateUserDto extends PartialType(CreateDemoDto) {
    // PartialType的作用：
    // 1. 把 CreateDemoDto 所有属性设置为可选
    // 2. 继承 CreateDemoDto 的验证规则
    // 3. 避免冗余的代码
  }
  ```  
* 请求生命周期
  - 传入请求 -> 中间件(先全局后模块) -> 守卫（先全局次控制器后路由）-> 拦截器（先全局次控制器后路由）-> 管道(先全局次控制器后路由参数) -> 控制器 -> 服务 -> 异常过滤器（路由然后是控制器，然后是全局）-> 服务器响应

## middleware
* 是什么？
  - 是处理请求和响应的核心机制之一,可访问请求对象（Request）、响应对象（Response）和 next() 函数，用于在请求到达路由处理程序之前或之后执行特定逻辑。
  - NestJS 支持两种中间件形式：函数式中间件和类中间件。

* 中间件的核心作用
  - 执行任意代码（如日志记录、请求验证）。
  - 修改请求和响应对象。
  - 结束请求-响应周期（如权限拦截）。
  - 调用下一个中间件或路由处理程序。

* 类中间件（Class Middleware）
  - 通过 @Injectable() 装饰器实现 NestMiddleware 接口。
  ```ts
    // logger.middleware.ts
    import { Injectable, NestMiddleware } from '@nestjs/common';
    import { Request, Response, NextFunction } from 'express';
    @Injectable()
    export class LoggerMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: NextFunction) {
            console.log(`[${new Date().toISOString()}] Request to ${req.path}`);
            next(); // 必须调用 next() 否则请求会被挂起
        }
    }
    // 在模块的 configure 方法中注册（支持类和函数式中间件）。
    export class UserModule implements NestModule{
        configure (consumer:MiddlewareConsumer) {
            consumer.apply(LoggerMiddleware).forRoutes('user')
            // .forRoutes({path:'user',method:RequestMethod.GET})
            // forRoutes(UserController)
        }
    }
  ```

* 函数式中间件（Functional Middleware）
  - 适用于不需要依赖注入的简单场景。在 main.ts 中使用 app.use()，仅适用于函数式中间件。
  ```ts
    // 定义
    // logger.middleware.ts
    import { Request, Response, NextFunction } from 'express';
    export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
        console.log(`[Functional Middleware] Request to ${req.path}`);
        next();
    }
    // 应用
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.use(loggerMiddleware)
        await app.listen(3000);
    }
    bootstrap();
  ```

* 依赖注入与中间件
  - 类中间件支持依赖注入，可以在构造函数中注入服务。
  ```ts
   // auth.middleware.ts
    @Injectable()
    export class AuthMiddleware implements NestMiddleware {
        constructor(private readonly authService: AuthService) {} // 依赖注入
        use(req: Request, res: Response, next: NextFunction) {
            if (!this.authService.validateToken(req.headers.token)) {
                throw new UnauthorizedException();
            }
            next();
        }
    }

    // 在模块中提供 AuthService
    @Module({
        providers: [AuthService],
    })
    export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer.apply(AuthMiddleware).forRoutes('*');
        }
    }
  ```

## 管道(Pipe)
* 可以分为 3 类：
  - parseXxx 把参数转为某种类型；
  - defaultValue 设置参数默认值；
  - validation 做参数的验证。
* 自带9个开箱即用的管道
  - ValidationPipe
  - ParseIntPipe
  - ParseFloatPipe
  - ParseBoolPipe
  - ParseArrayPipe
  - ParseUUIDPipe
  - ParseEnumPipe
  - ParseFilePipe
  - DefaultValuePipe



## 定时任务
* 任务的分类
  - cron job  固定的日期执行一次
  - intervals 指定的间隔后反复执行
  - timeouts 延迟多长时间执行一次
* 获取所有的任务和状态
  ```ts
    @ApiOperation({ summary: '获取所有CronJob的信息' })
    @Get('getCronJobs')
    getCronJobs() {
      const jobs = this.schedulerRegistry.getCronJobs();
      const jobList = [];
      jobs.forEach((value, key) => {
        let next;
        try {
          const nextDate = value.nextDates().toJSDate();
          next = dayjs(nextDate).format('YYYY-MM-DD HH:mm:ss');
        } catch (e) {
          next = 'error: next fire date is in the past!';
        }
        jobList.push({
          job: key,
          nextDate: next,
          running: value.running,
        });
      });
      return jobList;
    }
  
  const intervals = this.schedulerRegistry.getIntervals();
  const timeouts = this.schedulerRegistry.getTimeouts();
  ```
* 动态配置任务执行的时间
  ```ts
  @ApiOperation({ summary: '动态配置job执行的时间' })
  @Get('setJobTime')
  setTime(@Query() jobDto: JobDto) {
    // stops a job, sets a new time for it, and then starts it
    const job = this.schedulerRegistry.getCronJob(jobDto.jobName);
    job.setTime(new CronTime(jobDto.jobTime));
  }
  ```
* 手动控制任务的开始与停止
  ```ts
   const job = this.schedulerRegistry.getCronJob(jobName);
    if (job.running) {
      job.stop();
    } else {
      job.start();
    }
  ```
* 集群场景下数据重复的问题？
  - TODO

## 测试
* package.json
  ```json
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  ```
* 单元测试
 > 适用于一个类中的函数
  ```bash
  # 运行单元测试
  npm run test
  # 运行单元测试和覆盖率
  npm run test:cov
  ```
* 端到端测试
 > 适用于整个系统的测试
  ```bash
  npm run test:e2e
  ```
