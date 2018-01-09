import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskCollection from '../collections/TaskCollection';
import TaskCollectionView from './TaskCollectionView';
import template from '../templates/main-layout-template.html';

const MainLayoutView = Backbone.View.extend({
  el: '#app',

  events: {
    'click #btn-show-all': 'onFilterNone',
    'click #btn-show-complete': 'onFilterComplete',
    'click #btn-show-incomplete': 'onFilterIncomplete'
  },

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

  onFilterNone() {
    this.taskCollection.trigger('apply:filter');
  },

  onFilterComplete() {
    this.taskCollection.trigger('apply:filter', {isCompleted: true});
  },

  onFilterIncomplete() {
    this.taskCollection.trigger('apply:filter', {isCompleted: false});
  },

  showTaskListView() {
    const task1 = new TaskModel({description: 'Create a todo app in Backbone.'}),
          task2 = new TaskModel({description: 'Learn how to use Marionette.'});

    this.taskCollection = new TaskCollection([task1, task2]);

    const taskCollectionView = new TaskCollectionView({
      collection: this.taskCollection
    });

    const $taskListContainer = this.$el.find('#task-list-view');

    $taskListContainer.html(taskCollectionView.$el);

  }
});

export default MainLayoutView;
