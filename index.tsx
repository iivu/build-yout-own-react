import * as Didact from './Didact';

/* @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.querySelector('#root');
Didact.render(element,container);