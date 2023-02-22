import { port } from './configuration';
import Koa from 'koa';
import KoaRouter from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { RegisterRoutes } from './routes';
import { koaSwagger } from 'koa2-swagger-ui';
import KoaMount from 'koa-mount';
import KoaServe from 'koa-static';
import * as fs from 'node:fs';

export class App {
  run(): void {
    const app: Koa = new Koa();
    app.use(bodyParser());
    const router = new KoaRouter();
    RegisterRoutes(router);
    app.listen(port);
    app.use(router.routes()).use(router.allowedMethods());
    console.log(`anybody out there? port: ${port}`);

    this.enableSwaggerDocs(app);
  }

  private enableSwaggerDocs(app: Koa) {
    const spec = fs.readFileSync('swagger.json').toString();

    app.use(
      koaSwagger({
        routePrefix: '/swagger',
        swaggerOptions: {
          spec: JSON.parse(spec),
        },
        hideTopbar: true,
        title: 'FantasyStats API',
      })
    );
    app.use(KoaMount('/', KoaServe('./node_modules/swagger-ui-dist')));
  }
}

export const app = new App();
app.run();
