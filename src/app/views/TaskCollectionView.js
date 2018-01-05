import Backbone from 'backbone';
import dust from 'dustjs-helpers';
import TaskView from '../views/TaskView';
import TaskCollection from '../collections/TaskCollection';
import template from '../templates/task-collection-template.html';

const taskCollectionView = Backbone.View.extend({
  collection: TaskCollection,

  initialize() {
    this.render();
  },

  render() {
    let templateToRender = null;

    this.collection.each((model) => {
      const taskView = new TaskView({ model: model });
      dust.render(template, taskView.model.toJSON(), (err, result) => {
        templateToRender = result;
        this.$el.append(templateToRender);
      });
    });
  }
});

export default taskCollectionView;
