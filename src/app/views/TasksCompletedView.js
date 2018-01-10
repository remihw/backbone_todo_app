import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/tasks-completed-template.html';

const TasksCompletedView = Backbone.View.extend({
  initialize(options) {
    console.log('TasksCompletedView is being initialized');
    this.baseCollection = options.baseCollection;
    this.listenTo(this.baseCollection, 'change', this.render);
    this.listenTo(this.baseCollection, 'remove', this.render);
    this.listenTo(this.baseCollection, 'add', this.render);
    // this.listenTo(this.collection, 'change:isCompleted', this.render);
    // this makes sure this view updates the number with all added tasks
    this.listenTo(this.baseCollection, 'reset', this.render);

    this.render();
  },

  render() {
    console.log('TasksCompletedView is being rendered');
    console.log(this.baseCollection.length);
    this.totalTasks = this.baseCollection.length;
    this.completedTasks = this.baseCollection.models.filter(model => model.attributes.isCompleted === true).length;

    let templateToRender = null;

    dust.render(template, {incompleteTasks: this.completedTasks, totalTasks: this.totalTasks}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  }
});

export default TasksCompletedView;