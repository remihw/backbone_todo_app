import Backbone from 'backbone';
// import dust from 'dustjs-helpers';
import TaskView from '../views/TaskView';
// import template from '../templates/task-collection-template.html';

const taskCollectionView = Backbone.View.extend({
  id: 'task-list',

  initialize() {
    this.listenTo(this.collection, 'remove', this.render);
    this.render();
  },

  render() {
    this.$el.empty();
    this.collection.each((model) => {
      const taskView = new TaskView({ model });
      this.$el.append(taskView.render().el);
    });
  }
});

export default taskCollectionView;
