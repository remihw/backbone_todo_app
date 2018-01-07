import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskModel from '../models/TaskModel';
import template from '../templates/add-task-template.html';

const AddTaskView = Backbone.View.extend({
  events: {
    keydown: 'keyAction'
  },

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
  },

  keyAction(e) {
    if (e.which === 13) {
      const newTask = new TaskModel({
        description: $('#input-new-task').val()
      });
      this.collection.add(newTask);
      $('#input-new-task').focus();
    }
  }
});

export default AddTaskView;
