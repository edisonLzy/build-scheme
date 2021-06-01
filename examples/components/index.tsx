import {BaseWauCropper} from './types'
interface P extends BaseWauCropper{
    name:string
}

interface IWauCropper{
    /**
     * @description 文本描述
     * @tag Form.Item
     */
    style:  P
}

export default function Cropper(props:IWauCropper) {
   return <h1>xxx</h1>
}
