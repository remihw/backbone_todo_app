import Backbone from 'backbone';
import AppRouter from './routers/AppRouter';

const app = {
  start() {
    const router = new AppRouter();
    if (!Backbone.history.started) {
      Backbone.history.start();
    }
  },
};

export default app;
