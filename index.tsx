import * as Didact from './Didact';

/* @jsx Didact.createElement */
const element = (
  <div id="foo">
    <span>bar</span>
    <span>bar2</span>
  </div>
);
const container = document.querySelector('#root') as HTMLElement;
Didact.render(element, container);
