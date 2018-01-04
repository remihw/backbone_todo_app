import $ from 'jquery';
import dust from 'dustjs-helpers';
import Backbone from 'backbone';
import template from '../templates/TaskTemplate.html';

const TaskView = Backbone.View.extend({
  initialize() {
    this.render();
  },

  render() {
    let templateToRender = null;

    dust.render(template, this.model.toJSON(), (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);

    return this;
  },
});

export default TaskView;
