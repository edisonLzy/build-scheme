import {BaseWauCropper} from './types'
interface IWauCropper extends BaseWauCropper{
    /** 
     * @description 文本描述
     * @tag Form.Item
     * @component Form
     * @default 文本
     *  */
    label?: string
}

export default function Cropper(props:IWauCropper) {
   return <h1>xxx</h1>
}


export function Input({name}:{
    name:string
}){
    return <span>1</span>
}