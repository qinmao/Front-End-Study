# 集成swagger

## 安装
  ```bash
    npm install @nestjs/swagger
    # 若使用 JWT 认证，还需安装相关包
    npm install @nestjs/passport passport-jwt @types/passport-jwt
  ```

##  配置 Swagger 文档（main.ts）
  ```ts
    import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
    export const generateDocument = (app) => {
    const options = new DocumentBuilder()
        .setTitle('nestjs服务项目接口文档')
        .setDescription('接口文档')
        .setVersion('1.0')
        // .addTag('cats')
        .setContact('xintairuan', 'http://www.linzai.cn', 'qinmao@linzai.cn')
        // 1. 添加 Bearer 认证
        .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Enter JWT token',
            in: 'header',
        },
        'BearerAuth',
        )
        // 2. 全局启用 BearerAuth 授权，避免在每个控制器或方法上重复添加 @ApiBearerAuth('BearerAuth')
        .addSecurityRequirements('BearerAuth', []) // 所有接口默认需要 BearerAuth 授权
        // 3. 添加一个空安全方案
        // 4. 对于不需要授权的接口（如登录、注册），使用 @ApiSecurity('public') 标记它们
        .addSecurity('public', { type: 'apiKey', in: 'header', name: 'NoAuth' })
        .build();

    const documentFactory = SwaggerModule.createDocument(app, options, {
        // 忽略通过 setGlobalPrefix() 设置的路由的全局前缀
        // ignoreGlobalPrefix: true
        // include?: Function[];
    });

    // SwaggerModule.setup('/swagger/doc', app, document);
    SwaggerModule.setup('swagger', app, documentFactory, {
        // http://localhost:3000/swagger/json
        jsonDocumentUrl: 'swagger/json',
        yamlDocumentUrl: 'swagger/yaml',
        swaggerOptions: {
        persistAuthorization: true, // 使授权信息在页面刷新时保持
        // 兼容 省略输入 Bearer + 空格
        requestInterceptor: (req) => {
            const token = req.headers.Authorization;
            if (token && !token.startsWith('Bearer ')) {
            req.headers.Authorization = `Bearer ${token}`;
            }
            return req;
        },
        },
    });
    };

  ```

## 标记 不需要 swagger 授权的接口
  ```ts
    import { ApiSecurity, ApiTags } from '@nestjs/swagger';

    @ApiTags('Auth')
    @Controller('auth')
    export class AuthController {
        @Post('login')
        @ApiSecurity('public') // 覆盖全局授权配置
        async login() {
            // 登录逻辑（无需授权）
        }
    }
  ```