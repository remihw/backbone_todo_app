import Backbone from 'backbone';
import TaskView from '../views/TaskView';
import AddTaskView from './AddTaskView';

const taskCollectionView = Backbone.View.extend({
  id: 'task-list',

  initialize() {
    console.log(this.collection);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change:isCompleted', this.render);
    this.listenTo(this.collection, 'change:isBeingEdited', this.render);
    
    this.listenTo(this.collection, 'apply:filter', this.onApplyFilter);
    this.render();
  },

  render() {
    this.$el.empty();
    console.log(this.collection)

    this.collection.each((model) => {
      const taskView = new TaskView({model});
      this.$el.append(taskView.render().el);
    });
    
    this.showAddTaskView();
  },

  onApplyFilter(filter) {
    // todo:
    // whole collection is gone after this
    // dynamic filters

    const filteredModels = this.collection.where({isCompleted: true});
    this.collection.reset(filteredModels);
    this.render();
  },

  showAddTaskView() {
    const addTaskView = new AddTaskView({
      collection: this.collection
    });

    this.$el.append(addTaskView.render().el);
  }
});

export default taskCollectionView;
