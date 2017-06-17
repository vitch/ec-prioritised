import EmberObject from 'ember-object';
import computed from 'ember-computed';
import { task, timeout } from 'ember-concurrency';

const Item = EmberObject.extend({
  parent: null,
  group: null,

  children: computed('depth', function() {
    let depth = this.get('depth');
    return Array.from({ length: depth * 10 }).map((_, id) => Item.create({ id, parent: this, group: this.get('group') }))
  }),

  depth: computed('parent', function() {
    let parent = this.get('parent');
    if (!parent) {
      return 1;
    }
    return parent.get('depth') + 1;
  }),

  label: computed('id', 'parent.label', function() {
    let label = this.get('parent.label');
    if (label) {
      label += '.';
    } else {
      label = 'Item ';
    }
    return `${label}${this.get('id')}`;
  }),

  startShowing() {
    if (!this.get('_isCompleteA')) this.get('taskA').perform(1000);
    if (!this.get('_isCompleteB')) this.get('taskB').perform(2000);
    if (!this.get('_isCompleteC')) this.get('taskC').perform(3000);
  },

  stopShowing() {
    this.get('taskA').cancelAll();
    this.get('taskB').cancelAll();
    this.get('taskC').cancelAll();
  },

  taskA: task(function* () {
    yield timeout(Math.random() * 1000);
    this.set('_isCompleteA', true);
  }).group('group'),

  taskB: task(function* () {
    yield timeout(Math.random() * 5000);
    this.set('_isCompleteB', true);
  }).group('group'),

  taskC: task(function* () {
    for (let i=0; i < 100; i++) {
      yield timeout(Math.random() * 50);
      this.set('countTaskC')
    }
    this.set('_isCompleteC', true);
  }).group('group'),
});

export default Item;
