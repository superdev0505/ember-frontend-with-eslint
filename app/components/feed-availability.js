import Component from '@ember/component';
// import { observer } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['availability'],
  isNow: false,
  isToday: false
});
