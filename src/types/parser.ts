export interface Parse {
    filePath: string
}
export interface ComponentDoc {
    displayName: string;
    description: string;
    props: Props;
    methods: Method[];
    tags?: {};
  }