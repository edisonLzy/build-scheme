export interface BaseWauCropper {
    /** prop1 description */
    src: string
    /** 
     * prop1 description */
    type: RatioType
  }
  
  export type RatioType = '16:9' | '4:3' | '1:1' | 'auto'
  