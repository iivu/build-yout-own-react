type ElementType = string;
type Props = object | null;
type Children = Array<any>;

const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default function createElement(
  type: ElementType,
  props: Props,
  ...children: Children
) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextElement(child);
      }),
    },
  };
}

// 包装text节点，让children数组内的每一项都是一个对象，统一行为
function createTextElement(text: string) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
