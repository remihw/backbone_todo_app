import Backbone from 'backbone';

const TaskModel = Backbone.Model.extend({
  defaults: {
    taskDescription: ''
  }
});

export default TaskModel;
