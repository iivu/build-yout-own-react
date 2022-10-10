export type ElementType = string;
export type Props = object | null;
export type Children = Array<any>;
export type Element = { 
    type: ElementType,
    props: object & { children: Children }
}