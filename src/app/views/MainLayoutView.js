import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import TaskCollection from '../collections/TaskCollection';
import TaskCollectionView from './TaskCollectionView';
import TasksCompletedView from './TasksCompletedView';
import template from '../templates/main-layout-template.html';

// after using delete-all-complete the view does not update when
// deleting individual tasks

const MainLayoutView = Backbone.View.extend({
  el: '#app',

  events: {
    'click #btn-show-all': 'onFilterNone',
    'click #btn-show-complete': 'onFilterComplete',
    'click #btn-show-incomplete': 'onFilterIncomplete',
    'click #btn-remove-complete-tasks': 'onDeleteComplete'
  },

  initialize() {
    this.render();
    this.showTaskListView();
    this.showTasksCompleted();
    // the default view shows all tasks, so we also add the
    // class 'active-filter-btn' to the 'Alles' button on initialization
    $('#btn-show-all').addClass('active-filter-btn');
  },

  render() {
    let templateToRender = null;

    dust.render(template, {}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  },

  onFilterNone() {
    this.taskCollection.trigger('apply:filter', null);
    $('button').removeClass('active-filter-btn');
    $('#btn-show-all').addClass('active-filter-btn');
  },

  onFilterComplete() {
    this.taskCollection.trigger('apply:filter', true);
    $('button').removeClass('active-filter-btn');
    $('#btn-show-complete').addClass('active-filter-btn');
  },

  onFilterIncomplete() {
    this.taskCollection.trigger('apply:filter', false);
    $('button').removeClass('active-filter-btn');
    $('#btn-show-incomplete').addClass('active-filter-btn');
  },

  onDeleteComplete() {
    this.taskCollection.trigger('remove:allCompletedTasks');
  },

  showTaskListView() {
    const task1 = new TaskModel({
            description: 'Create a todo app in Backbone.'
          }),
          task2 = new TaskModel({
            description: 'Learn how to use Marionette.'
          }),

          taskCollection = new TaskCollection([task1, task2]),
          baseTaskCollection = new TaskCollection([task1, task2]),

          taskCollectionView = new TaskCollectionView({
            collection: taskCollection,
            baseCollection: baseTaskCollection
          }),

          $taskListContainer = this.$el.find('#task-list-view');

    $taskListContainer.html(taskCollectionView.$el);

    this.taskCollection = taskCollection;
    this.baseTaskCollection = baseTaskCollection;
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
