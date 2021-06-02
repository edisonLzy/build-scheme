import { BaseWauCropper } from './types'
import {CSSProperties} from 'react'
interface P {
  /**
   * @description P
   * @tag Input
   * @component Input
   * @default lee
   */
  name: string
}

interface IWauCropper {
  /**
   * @description 文本描述
   * @tag Form.Item
   * @component Form
   */
  style: P
  /**
   * @tag Radio
   */
  size:React.CSSProperties
}

export default function Cropper (props: IWauCropper) {
  return <h1>xxx</h1>
}
