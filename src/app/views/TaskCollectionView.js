import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskView from '../views/TaskView';
import TaskCollection from '../collections/TaskCollection';
import template from '../templates/task-collection-template.html';

const taskCollectionView = Backbone.View.extend({
  collection: TaskCollection,

  id: 'task-item-collection',

  initialize() {
    this.render();
  },

  render() {
    this.collection.each((model) => {
      const taskView = new TaskView({ model: model });
      this.$el.append(taskView.render().el.innerHTML);
    });
  }
});

export default taskCollectionView;
