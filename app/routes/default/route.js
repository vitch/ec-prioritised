import Route from 'ember-route';
import Item from 'ec-prioritised/models/item';

import { taskGroup } from 'ember-concurrency';

export default Route.extend({
  group: taskGroup().maxConcurrency(2),
  model() {
    return Array.from({ length: 3 }).map((_, id) => Item.create({ id, group: this.get('group') }));
  }
});
