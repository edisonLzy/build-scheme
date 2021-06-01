export interface Parse {
  filePath: string
}
export interface ComponentDoc {
  displayName: string
  description: string
  props: Props
  methods: Method[]
  tags?: {}
}

export interface MethodParameterType {
    name: string;
  }
export interface MethodParameter {
    name: string;
    description?: string | null;
    type: MethodParameterType;
  }
  
export interface Method {
    name: string;
    docblock: string;
    modifiers: string[];
    params: MethodParameter[];
    returns?: {
      description?: string | null;
      type?: string;
    } | null;
    description: string;
  }

  
export interface PropItemType {
    name: string;
    value?: any;
    raw?: string;
  }
  
export interface StringIndexedObject<T> {
    [key: string]: T;
  }
export interface Props extends StringIndexedObject<PropItem> {}

export interface ParentType {
    name: string;
    fileName: string;
  }

  
export interface PropItem {
    name: string;
    required: boolean;
    type: PropItemType;
    description: string;
    defaultValue: any;
    parent?: ParentType;
    declarations?: ParentType[];
    tags?: {};
  }

  