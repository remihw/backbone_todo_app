import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/task-header-template.html';

const TaskHeaderView = Backbone.View.extend({
  initialize() {
    this.render();
  },

  render() {
    let templateToRender = null;

    dust.render(template, {}, (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);

    return this;
  }
});

export default TaskHeaderView;
