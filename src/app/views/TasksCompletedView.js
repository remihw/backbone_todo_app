import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/tasks-completed-template.html';

const TasksCompletedView = Backbone.View.extend({
  initialize(options) {
    this.baseCollection = options.baseCollection;
    this.listenTo(this.baseCollection, 'change', this.render);
    this.listenTo(this.baseCollection, 'remove', this.render);
    this.listenTo(this.baseCollection, 'add', this.render);
    this.listenTo(this.baseCollection, 'reset', this.render);
    this.render();
  },

  render() {
    const totalTasks = this.baseCollection.length,
          completedTasks = this.baseCollection.models.filter(model => {
            return model.get('isCompleted') === true;
          }).length;

    let templateToRender = null;

    dust.render(template, {completedTasks, totalTasks}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);
  }
});

export default TasksCompletedView;
