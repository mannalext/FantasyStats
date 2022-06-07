import { App } from './app';

const app = new App();
app.run();

// const app = express();
// const application = new App();
// const league = async () => {
//   await application.createLeague('testLeague');
// };
// console.log(league());

// app.listen(port, () => {
//   console.log('hi');
// });

// TODO: follow the pattern of using an App class in app.ts, instantiating it and calling app.run in here
// inside the run() function, we make the express app and .use all the middleware and routers
