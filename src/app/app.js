import Backbone from 'backbone';
import AppRouter from './routers/AppRouter';

const app = {
  start() {
    let router = new AppRouter();
    if (!Backbone.history.started) {
      Backbone.history.start();
    }
  },
};

export default app;
