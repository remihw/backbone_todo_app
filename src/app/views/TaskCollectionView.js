import Backbone from 'backbone';
import TaskView from '../views/TaskView';
import AddTaskView from './AddTaskView';

const taskCollectionView = Backbone.View.extend({
  id: 'task-list',

  initialize() {
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change:isCompleted', this.render);
    this.listenTo(this.collection, 'change:isBeingEdited', this.render);
    this.render();
  },

  render() {
    this.$el.empty();
    this.collection.each((model) => {
      const taskView = new TaskView({ model });
      this.$el.append(taskView.render().el);
    });
    this.showAddTaskView();
  },

  showAddTaskView() {
    const addTaskView = new AddTaskView({
      collection: this.collection
    });

    this.$el.append(addTaskView.render().el);
  }
});

export default taskCollectionView;
