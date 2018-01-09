import Backbone from 'backbone';
import TaskView from '../views/TaskView';
import AddTaskView from './AddTaskView';

const taskCollectionView = Backbone.View.extend({
  id: 'task-list',

  baseCollection: [],

  filter: null,

  initialize(options) {
    this.baseCollection = options.baseCollection;

    this.listenTo(this.collection, 'remove', this.onRemoveTask);
    this.listenTo(this.collection, 'add', this.onAddNewTask);
    this.listenTo(this.collection, 'change:isCompleted', this.onToggleCompletion);
    this.listenTo(this.collection, 'change:isBeingEdited', this.render);
    this.listenTo(this.collection, 'apply:filter', this.onApplyFilter);
    this.listenTo(this.collection, 'remove:model', this.onRemoveCompleted);
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

  onToggleCompletion() {
    this.onApplyFilter(this.filter);
  },

  onRemoveTask(removedModel) {
    this.baseCollection = this.baseCollection.filter(model => model !== removedModel);
    this.onApplyFilter(this.filter);
  },

  onAddNewTask(addedModel) {
    this.baseCollection.push(addedModel);
    this.onApplyFilter(this.filter);
  },

  onApplyFilter(filter) {
    this.filter = filter;
    this.collection.reset(this.baseCollection);

    if (this.filter !== null) {
      const filteredModels = this.collection.where({isCompleted: this.filter});
      this.collection.reset(filteredModels);
    }

    this.render();
  },

  onRemoveCompleted() {
    this.baseCollection = this.baseCollection.filter(model => model.get('isCompleted') !== true);
    this.onApplyFilter(this.filter);
  }
});

export default taskCollectionView;
