import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/tasks-completed-template.html';

const TasksCompletedView = Backbone.View.extend({
  initialize() {
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change:isCompleted', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.render();
  },

  render() {
    this.totalTasks = this.collection.length;
    this.completedTasks = this.collection.filter(model => model.attributes.isCompleted === true).length;

    let templateToRender = null;

    dust.render(template, {incompleteTasks: this.completedTasks, totalTasks: this.totalTasks}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  }
});

export default TasksCompletedView;