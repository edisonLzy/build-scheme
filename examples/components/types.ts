interface C {
   name: string
}
export interface BaseWauCropper {
    /** prop1 description */
    src: C
    /** 
     * prop1 description */
    type: RatioType
  }
  
  export type RatioType = '16:9' | '4:3' | '1:1' | 'auto'
  