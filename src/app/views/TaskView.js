import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/task-template.html';

const TaskView = Backbone.View.extend({
  initialize() {
    // add code here
  },

  render(model, option) {
    console.log(model);
    console.log(option);

    let templateToRender = null;

    dust.render(template, this.model.toJSON(), (err, result) => {
      templateToRender = result;
    });

    this.$el.html(templateToRender);

    return this;
  },

  events: {
    'click #btn-delete': 'deleteTask',
    'click #btn-edit': 'editTask',
    'click .task-description': 'toggleTaskCompletion'
  },

  deleteTask() {
    this.model.collection.remove(this.model);
  },

  editTask(model) {
    this.render(model, { editMode: true });
    // $('.task-list-row').css('display', 'none');
    // $('.task-list-row-edit').css('display', 'block');
  },

  toggleTaskCompletion() {
    this.model.set('completed', !this.model.get('completed'));
  }
});

export default TaskView;
