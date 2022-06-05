import express from "express";
import { port } from '@configuration';

export class App {
  // async createLeague(leagueName: string): Promise<League> {
  //   const repo = new PgStatsRepository();
  //   return await repo.createLeague(leagueName);
  // }
  
  run(): void {
    const app = express();
    app.listen(port, () => {
      console.log(`api server running on port ${port}`);
    });
  }
}