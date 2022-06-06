// import { port } from '@src/configuration';
import Koa from 'koa';
import KoaRouter from '@koa/router';
import { RegisterRoutes } from './routes';

export class App {
  // async createLeague(leagueName: string): Promise<League> {
  //   const repo = new PgStatsRepository();
  //   return await repo.createLeague(leagueName);
  // }
  
  run(): void {
    const app: Koa = new Koa();
    const router = new KoaRouter();
    RegisterRoutes(router);
    app.listen(8080);
    console.log('anybody out there?');


    // app.use(async (context: Koa.Context) => {
    //   context.body = 'hello world';
    // });

  }
}