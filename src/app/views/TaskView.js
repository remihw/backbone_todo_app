import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/task-template.html';

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

  events: {
    'click .btn-delete': 'deleteTask',
    'click .btn-edit': 'editTask'
  },

  deleteTask() {
    this.model.collection.remove(this.model);
  },

  editTask() {
    console.log('test');
  }
});

export default TaskView;
