import Backbone from 'backbone';
import MainLayoutView from '../views/MainLayoutView';

const AppRouter = Backbone.Router.extend({
  routes: {
    '*default': 'onDefaultRoute'
  },
  onDefaultRoute() {
    const mainLayoutView = new MainLayoutView();
  }
});

export default AppRouter;
