import Backbone from 'backbone';

const TaskModel = Backbone.Model.extend({
  defaults: {
    description: '',
    completed: false
  }
});

export default TaskModel;
