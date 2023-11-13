# pino 日志在 nest 中的使用
  - nestjs-pino 是基于 pino 封装的 nest 模块,可以拿来即用!
  - pino-http 自动记录每个请求/响应
## 日志要考虑的点
  - 格式化：日志的分级
  - 本地落库：日志文件切割存储, 定时清理, 减少内存占用
  - 模块包可配置化
  - 性能
## 安装
  ```
    npm i nestjs-pino pino-http
    # 格式美化
    npm i pino-pretty -D
  ```
## 使用步骤
* 第一步：在 AppModule 中引入日志模块
  ```ts
    // 两种引入:同步和异步
    import { LoggerModule } from 'nestjs-pino';
    @Module({
       imports: [
        LoggerModule.forRoot({
           // pino-http的参数配置
        // pino-http的参数配置
            pinoHttp: {
                customAttributeKeys: {
                    req: '请求信息',
                    res: '响应信息',
                    err: '错误信息',
                    responseTime: '响应时间(ms)',
                },
                // 互斥 useLevel
                customLogLevel(req, res: { statusCode: number }, err) {
                if (res.statusCode >= 400 && res.statusCode < 500) {
                    return 'warn';
                } else if (res.statusCode >= 500 || err) {
                    return 'error';
                } else if (res.statusCode >= 300 && res.statusCode < 400) {
                    return 'silent';
                }
                    return 'info';
                },
                serializers: {
                    req(req) {
                        req.httpVersion = req.raw.httpVersion;
                        req.params = req.raw.params;
                        req.query = req.raw.query;
                        req.body = req.raw.body;
                        return req;
                    },
                    err(err) {
                        err.params = err.raw.params;
                        err.query = err.raw.query;
                        err.body = err.raw.body;
                        return err;
                    },
                },
                transport: {
                    target: 'pino-pretty',
                    // options 是 pino-pretty 配置选项
                    options:
                        process.env.NODE_ENV !== 'production'
                        ? {
                            // 测试环境
                            colorize: true,
                            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                            }
                        : {
                            // 生产环境
                            colorize: false,
                            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                            //  保存日志到文件
                            destination: './log/combined.log',
                            mkdir: true,
                        },
                },
                genReqId(req: Request, res: Response) {
                    if (req.id) return req.id;
                    let id = req.get('X-Request-Id');
                    if (id) return id;
                    id = randomUUID();
                    res.header('X-Request-Id', id);
                    return id;
                },
                customSuccessMessage(req, res) {
                    if (res.statusCode === 404) {
                        return 'resource not found';
                    }
                    return `${req.method} completed`;
                },
            },
            // 路由作用域
            // forRoutes?: Parameters<MiddlewareConfigProxy['forRoutes']>;
            // 排除不作用的路由区域,
            // exclude?: Parameters<MiddlewareConfigProxy['exclude']>;

            // 就是检测已存在的 pino 就不用这个了,比如用了 Fastify 作为底层,它内置logger就是走的pino
            // useExisting?: true;
       })],
    })
    class AppModule {}
  ```
* 第二步:在 main.js 设置应用的日志
  ```ts
    import { Logger } from 'nestjs-pino';

    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));

    // 在程序中使用
    // NestJS standard built-in logger.
    // Logs will be produced by pino internally
    import { Logger } from '@nestjs/common';
    export class MyService {
        private readonly logger = new Logger(MyService.name);
        foo() {
            // All logger methods have args format the same as pino, but pino methods
            // `trace` and `info` are mapped to `verbose` and `log` to satisfy
            // `LoggerService` interface of NestJS:
            this.logger.verbose({ foo: 'bar' }, 'baz %s', 'qux');
            this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
            this.logger.log('foo');
        }
    }

  ```
## 日志轮转，拆分
  * 使用 logrotate 工具 centos 自带的
   - 在目录下 /etc/logrotate.d/myapp: 添加
   ```
    /var/log/myapp.log {
        su root
        daily
        rotate 7
        delaycompress
        compress
        notifempty
        missingok
        copytruncate
    }
   ```