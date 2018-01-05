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

  render() {
    let templateToRender = null;

    dust.render(template, {}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  },

  showTaskListView() {
    const task1 = new TaskModel({ description: 'Create an awesome todo app in Backbone.' });
    const task2 = new TaskModel({ description: 'Learn how to use Marionette.' });
    const taskCollection = new TaskCollection([task1, task2]);

    const taskCollectionView = new TaskCollectionView({
      collection: taskCollection
    });

    const $taskListContainer = this.$el.find('#task-list-view');
    $taskListContainer.html(taskCollectionView.$el);
  }
});

export default MainLayoutView;
