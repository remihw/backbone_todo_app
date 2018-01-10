import $ from 'jquery';
import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import template from '../templates/task-template.html';

const TaskView = Backbone.View.extend({
  id() {
    return `task_${this.model.cid}`;
  },

  initialize(options) {
    this.options = options;
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
    'focusout input': 'onFieldFocusOut',
    'click .task-description': 'toggleTaskCompletion'
  },

  deleteTask() {
    this.options.taskCollection.remove(this.model);
  },

  startEditMode() {
    this.model.set('isBeingEdited', true);
    $(`#task_${this.model.cid} input`).focus();
  },

  endEditMode() {
    this.model.set('isBeingEdited', false);
  },

  onFieldKeyDown(e) {
    // 13 is the Enter key and 27 is the Escape key
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
