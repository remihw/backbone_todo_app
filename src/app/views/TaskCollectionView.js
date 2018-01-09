import Backbone from 'backbone';
import TaskView from '../views/TaskView';
import AddTaskView from './AddTaskView';

const taskCollectionView = Backbone.View.extend({
  id: 'task-list',

  baseCollection: [],

  initialize() {
    this.baseCollection = this.collection.models.slice();
    this.listenTo(this.collection, 'remove', this.onRemovetask);
    this.listenTo(this.collection, 'add', this.onAddNewTask);
    this.listenTo(this.collection, 'change:isCompleted', this.render);
    this.listenTo(this.collection, 'change:isBeingEdited', this.render);
    this.listenTo(this.collection, 'apply:filter', this.onApplyFilter);
    this.render();
  },

  render() {
    this.$el.empty();

    this.collection.each((model) => {
      const taskView = new TaskView({model});
      this.$el.append(taskView.render().el);
    });

    this.showAddTaskView();
  },

  showAddTaskView() {
    const addTaskView = new AddTaskView({
      collection: this.collection
    });

    this.$el.append(addTaskView.render().el);
  },

  onRemovetask(removedModel) {
    this.baseCollection = this.baseCollection.filter(model => model !== removedModel);
    this.render();
  },

  onAddNewTask(addedModel) {
    this.baseCollection.push(addedModel);
    this.render();
  },

  onApplyFilter(filter) {
    this.collection.reset(this.baseCollection);

    if (filter !== undefined) {
      const filteredModels = this.collection.where(filter);
      this.collection.reset(filteredModels);
    }

    this.render();
  }
});

export default taskCollectionView;
