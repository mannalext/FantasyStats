import * as env from 'env-var';

const nodeEnv = env.get('NODE_ENV').default('production').asString();
export const devMode = (): boolean => nodeEnv !== 'production';

export const port = env.get('PORT').default(8080).required().asIntPositive();

