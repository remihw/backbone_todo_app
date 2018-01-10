import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskCollection from '../collections/TaskCollection';
import TaskCollectionView from './TaskCollectionView';
import TasksCompletedView from './TasksCompletedView';
import template from '../templates/main-layout-template.html';

// verwijder voltooid en delete werkt nog niet met gedeelte collectie

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
    $('#btn-show-all').addClass('active-filter-btn');
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
    $('#btn-show-complete, #btn-show-incomplete').removeClass('active-filter-btn');
    $('#btn-show-all').addClass('active-filter-btn');
  },

  onFilterComplete() {
    this.taskCollection.trigger('apply:filter', true);
    $('#btn-show-all, #btn-show-incomplete').removeClass('active-filter-btn');
    $('#btn-show-complete').addClass('active-filter-btn');
  },

  onFilterIncomplete() {
    this.taskCollection.trigger('apply:filter', false);
    $('#btn-show-all, #btn-show-complete').removeClass('active-filter-btn');
    $('#btn-show-incomplete').addClass('active-filter-btn');
  },

  onDeleteComplete() {
    this.taskCollection.trigger('remove:model');
  },

  showTaskListView() {
    const task1 = new TaskModel({description: 'Create a todo app in Backbone.'}),
          task2 = new TaskModel({description: 'Learn how to use Marionette.'}),
          taskCollection = new TaskCollection([task1, task2]),
          baseTaskCollection = new TaskCollection([task1, task2]),
          taskCollectionView = new TaskCollectionView({
            collection: taskCollection,
            baseCollection: baseTaskCollection
          }),
          $taskListContainer = this.$el.find('#task-list-view');

    this.taskCollection = taskCollection;
    this.baseTaskCollection = baseTaskCollection;

    $taskListContainer.html(taskCollectionView.$el);
  },

  showTasksCompleted() {
    const tasksCompleted = new TasksCompletedView({
            baseCollection: this.baseTaskCollection,
            collection: this.taskCollection
          }),

          $tasksCompletedContainer = this.$el.find('#tasks-completed');

    $tasksCompletedContainer.html(tasksCompleted.$el);
  }
});

export default MainLayoutView;
