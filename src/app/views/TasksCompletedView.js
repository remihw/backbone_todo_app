import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/tasks-completed-template.html';

const TasksCompletedView = Backbone.View.extend({
  initialize(options) {
    this.baseCollection = options.baseCollection;

    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change:isCompleted', this.render);
    // this makes sure this view updates the number with all added tasks
    // this.listenTo(this.collection, 'reset', this.render);

    this.render();
  },

  render() {
    console.log('TasksCompletedView is being rendered');
    console.log(this.baseCollection.length);
    this.totalTasks = this.baseCollection.length;
    this.completedTasks = this.baseCollection.filter(model => model.attributes.isCompleted === true).length;

    let templateToRender = null;

    dust.render(template, {incompleteTasks: this.completedTasks, totalTasks: this.totalTasks}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  }
});

export default TasksCompletedView;