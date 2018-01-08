import _ from 'lodash';
import Backbone from 'backbone';

const TaskModel = Backbone.Model.extend({
  defaults: {
    description: '',
    isCompleted: false,
    isBeingEdited: false
  },

  validate(attrs) {
    if (_.isEmpty(attrs.description)) {
      return 'Please enter in a task.';
    }
  }
});

export default TaskModel;
