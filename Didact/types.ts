export type ElementType = string;
export type Props = object | null;
export type Children = Array<Element>;
export type Element = {
  type: ElementType;
  props: object & { children: Children };
};
export type Fiber =Partial<Element> & {
  dom?: HTMLElement;
  parent?: Fiber;
  sibling?: Fiber;
  child?: Fiber;
  alternate? :Fiber;
};
