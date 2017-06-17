import EmberObject from 'ember-object';
import computed from 'ember-computed';

const Item = EmberObject.extend({
  parent: null,

  children: computed('depth', function() {
    let depth = this.get('depth');
    return Array.from({ length: depth * 10 }).map((_, id) => Item.create({ id, parent: this }))
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
  })
});

export default Item;
