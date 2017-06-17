import Route from 'ember-route';
import Item from 'ec-prioritised/models/item';

export default Route.extend({
  model() {
    return Array.from({ length: 3 }).map((_, id) => Item.create({ id }));
  }
});
