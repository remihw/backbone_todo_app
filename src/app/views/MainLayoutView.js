import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskCollection from '../collections/TaskCollection';
import TaskCollectionView from './TaskCollectionView';
import template from '../templates/main-layout-template.html';

const MainLayoutView = Backbone.View.extend({
  el: '#app',

  events: {
    'click .test-button': 'onFilterCollection'
  },

  initialize() {
    this.render();
    this.showTaskListView();
  },

  render() {
    let templateToRender = null;

    dust.render(template, {totalItems: '4', notCompletedItems: '3'}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  },

  onFilterCollection(evt) {
    this.taskCollection.trigger('apply:filter', {});
  },

  showTaskListView() {
    const task1 = new TaskModel({description: 'Create a todo app in Backbone.'}),
          task2 = new TaskModel({description: 'Learn how to use Marionette.'});
    
    this.taskCollection = new TaskCollection([task1, task2]);

    const taskCollectionView = new TaskCollectionView({
      collection: this.taskCollection
    }),

    $taskListContainer = this.$el.find('#task-list-view');

    $taskListContainer.html(taskCollectionView.$el);

  }
});

export default MainLayoutView;
