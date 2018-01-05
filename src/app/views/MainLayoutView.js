import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskCollection from '../collections/TaskCollection';
import TaskCollectionView from './TaskCollectionView';
import template from '../templates/main-layout-template.html';

const MainLayoutView = Backbone.View.extend({
  el: '#app',

  initialize() {
    this.render();
    this.showTaskListView();
  },

  showTaskListView() {
    const task1 = new TaskModel({
      taskDescription: 'Create an awesome todo app.'
    });

    const task2 = new TaskModel({
      taskDescription: 'Learn how to use Marionette.js.'
    });

    const taskCollection = new TaskCollection([task1, task2]);

    const taskCollectionView = new TaskCollectionView({
      collection: taskCollection
    });

    const $taskListContainer = this.$el.find('#task-list-view');
    $taskListContainer.html(taskCollectionView.$el);
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
