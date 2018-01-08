import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/task-template.html';

const TaskView = Backbone.View.extend({
  initialize() {
    // code here
  },

  id() {
    return `task_${this.model.cid}`;
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
    'click #btn-delete': 'deleteTask',
    'click #btn-edit': 'startEditMode',
    'keydown': 'onFieldKeyDown',
    'click .task-description': 'toggleTaskCompletion',
    'focusout input': 'onFieldFocusOut'
  },

  deleteTask() {
    this.model.collection.remove(this.model);
  },

  startEditMode() {
    this.model.set('isBeingEdited', true);
    $(`#task_${this.model.cid} input`).focus();
  },

  endEditMode() {
    this.model.set('isBeingEdited', false);
  },

  onFieldKeyDown(e) {
    if (e.which === 13) {
      this.model.set('description', $(`#task_${this.model.cid} input`).val());
      this.endEditMode();
    } else if (e.which === 27) {
      this.endEditMode();
    }
  },

  onFieldFocusOut() {
    this.endEditMode();
  },

  toggleTaskCompletion() {
    this.model.set('isCompleted', !this.model.get('isCompleted'));
  }
});

export default TaskView;
