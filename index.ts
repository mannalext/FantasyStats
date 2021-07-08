
import express from 'express';
import { port } from '@configuration';

const app = express();

app.listen(port, () => {
  console.log('hi');
});

// TODO: follow the pattern of using an App class in app.ts, instantiating it and calling app.run in here
// inside the run() function, we make the express app and .use all the middleware and routers
