import { TEXT_ELEMENT } from './constant';
import type { Element } from './types';

export default function render(element: Element, container: HTMLElement) {
  // 区分是普通的节点还是文本节点
  const dom =
    element.type === TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(element.type);
  const isProperty = (key: string) => key !== 'children';
  //把除children外的props附加到节点上
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => (dom[name] = element.props[name]));
  element.props.children.forEach(child => render(child, dom as HTMLElement));
  container.appendChild(dom);
}
