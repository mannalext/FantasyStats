import * as env from 'env-var';

// const nodeEnvironment = env.get('NODE_ENV').default('production').asString();
export const port = env.get('PORT').default(9092).asIntPositive();
// export const developmentMode = (): boolean => nodeEnvironment !== 'production';

// import * as path from 'node:path';

interface DatabaseConfiguration {
  host?: string;
  database: string;
  user: string;
  password: string;
  port?: number;
  socketPath?: string;
}

// export interface  {
//   uri: string;
//   password: string;
//   scopes: string;
// }

export class Configuration {
  getDatabaseConfig(): DatabaseConfiguration {
    return this.isTestEnv() ? this.getTestDatabaseConfig() : this.getProdDatabaseConfig();
  }

  // TODO: this is maybe useful when setting up a config for hitting sleeper?
  // async getTheConfig(): Promise<> {
  //   return {
  //     uri: await this.getSecret(process.env. as string),
  //     password: await this.getSecret(process.env. as string),
  //     scopes: await this.getSecret(process.env. as string),
  //   };
  // }

  isTestEnv(): boolean {
    return process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development';
  }

  private getTestDatabaseConfig(): DatabaseConfiguration {
    return {
      host: 'localhost',
      database: 'postgres',
      user: 'postgres',
      password: 'admin',
      port: 5432,
    };
  }

  private getProdDatabaseConfig(): DatabaseConfiguration {
    return {
      host: 'lol',
      database: 'lol',
      user: 'lol',
      password: 'lol',
    };
  }
}
