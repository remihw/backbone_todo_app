import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskCollection from '../collections/TaskCollection';
import TaskCollectionView from './TaskCollectionView';
import TasksCompletedView from './TasksCompletedView';
import template from '../templates/main-layout-template.html';

const MainLayoutView = Backbone.View.extend({
  el: '#app',

  events: {
    'click #btn-show-all': 'onFilterNone',
    'click #btn-show-complete': 'onFilterComplete',
    'click #btn-show-incomplete': 'onFilterIncomplete',
    'click #btn-remove-complete': 'onDeleteComplete'
  },

  initialize() {
    this.render();
    this.showTaskListView();
    this.showTasksCompleted();
  },

  render() {
    let templateToRender = null;

    dust.render(template, {incompleteTasks: this.completedTasks, totalTasks: this.totalTasks}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  },

  onFilterNone() {
    this.taskCollection.trigger('apply:filter', null);
  },

  onFilterComplete() {
    this.taskCollection.trigger('apply:filter', true);
  },

  onFilterIncomplete() {
    this.taskCollection.trigger('apply:filter', false);
  },

  onDeleteComplete() {
    this.taskCollection.trigger('remove:model');
  },

  showTaskListView() {
    const task1 = new TaskModel({description: 'Create a todo app in Backbone.'}),
          task2 = new TaskModel({description: 'Learn how to use Marionette.'}),
          taskCollection = new TaskCollection([task1, task2]),
          taskCollectionView = new TaskCollectionView({
            collection: taskCollection
          }),
          $taskListContainer = this.$el.find('#task-list-view');

    this.taskCollection = taskCollection;
    $taskListContainer.html(taskCollectionView.$el);
  },

  showTasksCompleted() {
    // render TasksCompletedView and append it to div on main-layout-template
    const tasksCompleted = new TasksCompletedView({
            collection: this.taskCollection
          }),

          $tasksCompletedContainer = this.$el.find('#tasks-completed');

    $tasksCompletedContainer.html(tasksCompleted.$el);
  }
});

export default MainLayoutView;
