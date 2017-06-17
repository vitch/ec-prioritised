import Component from 'ember-component';

export default Component.extend({
  tagName: 'li',
  item: null,

  isShowingChildren: false,

  didInsertElement() {
    this.get('item').startShowing();
  },

  willDestroyElement() {
    this.get('item').stopShowing();
  },
});
