import express from 'express';
import { insertOwners } from './utils/insert-owners';
import { port } from 'configuration';

export class App {
  public async run (): Promise<void> {
    const expressApp = express();

    expressApp.listen(port, () => {
      console.log('hi');
    });

    insertOwners('blah');
  }
}
