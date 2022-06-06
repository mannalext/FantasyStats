import * as env from 'env-var';

const nodeEnvironment = env.get('NODE_ENV').default('production').asString();
export const developmentMode = (): boolean => nodeEnvironment !== 'production';

export const port = env.get('PORT').default(8080).required().asIntPositive();

