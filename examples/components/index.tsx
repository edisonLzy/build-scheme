import {BaseWauCropper} from './types'

interface P{
     /**
     * @description P
     * @tag Form
     */
    name:string
}

interface IWauCropper{
    /**
     * @description 文本描述
     * @tag Form.Item
     */
    style:  P
    
    /**
     * @tag Radio
     */
    size: 'large'| 'small'
}

export default function Cropper(props:IWauCropper) {
   return <h1>xxx</h1>
}
