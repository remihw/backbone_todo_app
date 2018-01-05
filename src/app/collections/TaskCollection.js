import Backbone from 'backbone';
import TaskModel from '../models/TaskModel';

const TaskCollection = Backbone.Collection.extend({
  model: TaskModel
});

export default TaskCollection;
