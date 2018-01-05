import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskView from '../views/TaskView';
import template from '../templates/main-layout-template.html';

const MainLayoutView = Backbone.View.extend({
  el: '#app',

  initialize() {
    this.render();
    this.showTaskListView();
  },

  showTaskListView() {
    const task1 = new TaskModel({
      taskDescription: 'Create an awesome todo app'
    });

    const taskView = new TaskView({
      model: task1
    });

    const $taskListContainer = this.$el.find('#task-list');
    $taskListContainer.html(taskView.$el);
  },

  render() {
    let templateToRender = null;

    dust.render(template, {}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  }
});

export default MainLayoutView;
