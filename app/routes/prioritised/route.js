import Route from 'ember-route';
import Item from 'ec-prioritised/models/item';

import { taskGroup } from 'ember-concurrency';

export default Route.extend({
  group: taskGroup()
    .maxConcurrency(2)
    .enqueueWithPriority(function(a, b) {
      let [priorityA] = a.args;
      let [priorityB] = b.args;
      let depthDiff = a.context.get('depth') - b.context.get('depth');
      return priorityA - priorityB - depthDiff;
    }),
  model() {
    return Array.from({ length: 3 }).map((_, id) => Item.create({ id, group: this.get('group') }));
  }
});
