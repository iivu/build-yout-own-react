import { TEXT_ELEMENT } from './constant';
import type { Element, Fiber } from './types';

let nextUnitOfWork:Fiber | null = null;
let wipRoot:Fiber | null = null

function commitRoot(){
  commitWork(wipRoot?.child!);
  wipRoot = null;
}

function commitWork(fiber:Fiber | undefined) {
  if(fiber === undefined) return
  const domParent = fiber.parent?.dom;
  domParent?.appendChild(fiber.dom!);
  commitWork(fiber.child);
  commitWork(fiber.sibling)
}

function workLoop(deadline: IdleDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork !== null && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if(nextUnitOfWork === null && wipRoot !== null) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: Fiber): Fiber | null {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }
  const elements = fiber.props!.children;
  let index = 0;
  let prevSibling: Fiber | null = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber: Fiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling!.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  if (fiber.child) return fiber.child;
  let nextFiber: Fiber | undefined = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}

function createDOM(fiber) {
  // 区分是普通的节点还是文本节点
  const dom =
    fiber.type === TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  const isProperty = (key: string) => key !== 'children';
  //把除children外的props附加到节点上
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => (dom[name] = fiber.props[name]));
  return dom;
}

export default function render(element: Element, container: HTMLElement) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}
