import Backbone from 'backbone';
import TaskView from '../views/TaskView';
import TaskModel from '../models/TaskModel';

const AppRouter = Backbone.Router.extend({
  routes: {
    '*default': 'onDefaultRoute',
  },
  onDefaultRoute() {
    const task1 = new TaskModel({
      taskDescription: 'Create a todo list in this awesome app.',
    });

    const view = new TaskView({
      el: '#app',
      model: task1,
    });
  },
});

export default AppRouter;
