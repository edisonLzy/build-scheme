export const DEFAULT_EXPORTS = [
    'default',
    '__function',
    'Stateless',
    'StyledComponentClass',
    'StyledComponent',
    'FunctionComponent',
    'StatelessComponent',
    'ForwardRefExoticComponent',
];
export const SUPPORT_PROPS = [
   'tag',
   'component', 
   'description'
] as const
  
type ArrayToUnion<T> =  T extends readonly (infer P)[] ?  P :null

export type SUPPORT_KEY  = ArrayToUnion<typeof SUPPORT_PROPS>