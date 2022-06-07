// import { port } from '@src/configuration';
import Koa from 'koa';
import KoaRouter from '@koa/router';
const bodyParser = require('koa-bodyparser');
import { RegisterRoutes } from './routes';
// import { koaSwagger } from 'koa2-swagger-ui';
// import KoaMount from 'koa-mount';
// import KoaServe from 'koa-static';


export class App {
  // async createLeague(leagueName: string): Promise<League> {
  //   const repo = new PgStatsRepository();
  //   return await repo.createLeague(leagueName);
  // }
  
  run(): void {
    const app: Koa = new Koa();
    app.use(bodyParser());
    const router = new KoaRouter();
    RegisterRoutes(router);
    app.listen(9090);
    app.use(router.routes()).use(router.allowedMethods());
    console.log('anybody out there?');
    
    // this.enableSwaggerDocs(app);
    

    // app.use(async (context: Koa.Context) => {
    //   context.body = 'hello world';
    // });

  }

  // private enableSwaggerDocs(app: Koa) {
  //   app.use(koaSwagger({ 
  //       routePrefix: "docs", 
  //       swaggerOptions: { 
  //           url: 'spec',
  //       },
  //       hideTopbar: true, 
  //       title: 'FantasyStats API',
  //       favicon: 'https://www.physna.com/assets/images/icon/favicon-32x32.png',
  //       // oauthOptions: { 
  //       //     usePkceWithAuthorizationCodeGrant: true,
  //       //     clientId: process.env.oktaOauthClientId,
  //       //     scopes: ["tenant"]
  //       // },
  //   }));
  //   app.use(KoaMount('/', KoaServe('./node_modules/swagger-ui-dist')));
  // }
}

const app = new App();
app.run();