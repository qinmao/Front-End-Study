# nest
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
## nest中的概念
### providers
* providers是什么？
  - Providers 是 Nest 的一个基本概念。许多 Nest 类可能被视为 provider - service, repository, factory, helper 等等。
  - 通过 constructor 注入依赖，来创建各种关系
  - Provider 只是一个用 @Injectable 装饰器注释的类。
* service 第二种用法(自定义名称)
  ```ts
    @Module({
        providers: [{
            provide: "ABC",
            useClass: DemoService
        }]

        // Controller 需要用对应的 Inject 取 不然会找不到的
        export class DemoController {
            constructor(
                @Inject('ABC') private readonly demoService: DemoService,
            ) {}
        }
  ```
* 自定义注入值
  ```ts
    @Module({
        providers: [{
            provide: "JD",
            useValue: ['TB', 'PDD', 'JD']
        }]
    })
        // DemoService 需要用对应的 Inject 取 不然会找不到的
        export class DemoService {
            constructor(
                @Inject('JD') private readonly shopList: string [],
            ) {}
        }
  ```
* 工厂模式：
  - 如果服务之间有相互的依赖 或者逻辑处理 可以使用 useFactory
  ```ts
    @Module({
        providers: [{
            provide: "Test",
            inject: [UserService2],
            useFactory(userService2: UserService2) {
                // 可以使用一些逻辑,支持异步 
                return new UserService3(userService2)
            }
        }]
    })
  ```
  - [参考](https://xiaoman.blog.csdn.net/article/details/126494064)
### module
* 共享模块
  - exports 导出才能在别的模块使用
* 全局模块
  - @Global() 注册为全局模块
  - 不需要再 imports 导入
* 动态模块
  ```ts
  export class ConfigModule {
    static forRoot(options: Options): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                  provide: "Config",
                  useValue: { baseApi: "/api" + options.path }
                }
            ],
            exports: [
                {
                  provide: "Config",
                  useValue: { baseApi: "/api" + options.path }
                }
            ]
        }
    }
  } 
  ```
### middleware
* 依赖注入中间件
  - 中间件是在路由处理程序 之前 调用的函数
  - 中间件函数可以访问请求和响应对象
    ```ts
     // 定义
    import { Injectable, NestMiddleware } from '@nestjs/common';
    import { Request, Response, NextFunction } from 'express';

    @Injectable()
    export class LoggerMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: NextFunction) {
            console.log('Request...');
            next();
        }
    }
    // 应用
    export class UserModule implements NestModule{
        configure (consumer:MiddlewareConsumer) {
            consumer.apply(Logger).forRoutes('user')
            // .forRoutes({path:'user',method:RequestMethod.GET})
            // forRoutes(UserController)
        }
    }

    ```
* 全局中间件
  ```ts
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    const whiteList = ['/list']
    function middleWareAll(req,res,next) {
        console.log(req.originalUrl,'我收全局的')
        if(whiteList.includes(req.originalUrl)){
            next()
        }else{
            res.send('小黑子露出鸡脚了吧')
        }
    }
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.use(middleWareAll)
        await app.listen(3000);
    }
    bootstrap();

  ```
### 管道(Pipe)
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
  - DefaultValuePipe
  - ParseFilePipe
### 守卫
* 内容
  - 使用 @Injectable() 装饰器的类
  - 应该实现 CanActivate 接口。
  - 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行
    ```ts
        import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
        import { Observable } from 'rxjs';

        @Injectable()
        export class TestGuard implements CanActivate {
            canActivate(
                context: ExecutionContext,
            ): boolean | Promise<boolean> | Observable<boolean> {
                console.log('经过了守卫');
                return true;
            }
        }
        // 1. controller 中使用
        @UseGuards(TestGuard)
        @Controller('demo')
        export class DemoController {}

       // 全局守卫
       app.useGlobalGuards(new TestGuard())

    ```
* SetMetadata 装饰器
  ```ts
    import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
    import { Observable } from 'rxjs';
    import { Reflector } from '@nestjs/core'
    import type { Request } from 'express'

    @Injectable()
    export class RoleGuard implements CanActivate {
        constructor(private Reflector: Reflector) { }
        canActivate(
            context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean> {
            const admin = this.Reflector.get<string[]>('role', context.getHandler())
            const request = context.switchToHttp().getRequest<Request>()
            if (admin.includes(request.query.role as string)) {
                return true;
            }else{
                return false
            }
        }
    }
    // controller 中使用
    @SetMetadata('role',['admin'])
  ```
### 装饰器
  ```ts
    // 案例1
    import { SetMetadata } from '@nestjs/common';
    export const Role = (args: string[]) => {
        return SetMetadata('role', args);
    };
    // controller 中使用
    @Role('admin')


   // 案例2 参数装饰器
   import { createParamDecorator,ExecutionContext ,applyDecorators } from '@nestjs/common';
   import  { Request } from 'express'

    export const ReqUrl = createParamDecorator((data:string,ctx:ExecutionContext)=>{
      const req = ctx.switchToHttp().getRequest<Request>()
      return req.url
    })

    // controller 中 findAll 方法使用
    findAll(@ReqUrl()  url){
      console.log(url)
    }
  ```
## 请求生命周期
 - 传入请求 -> 中间件(先全局后模块) -> 守卫（先全局次控制器后路由）-> 拦截器（先全局次控制器后路由）-> 管道(先全局次控制器后路由参数) -> 控制器 -> 服务 -> 异常过滤器（路由然后是控制器，然后是全局）-> 服务器响应
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
