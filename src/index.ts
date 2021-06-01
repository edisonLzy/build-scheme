import fs from 'fs-extra'
import { ComponentDoc, parse, Props,withCompilerOptions } from 'react-docgen-typescript'
import { DEFAULT_EXPORTS,SUPPORT_KEY} from './constant'
import { matchDesc } from './regExp';

interface IBuildScheme {
  filePath: string
  componentName: string
}
interface Scheme {
  /**
   * 属性名
   */
  prop:string
  /**
   * jsx组件名称 
   * @example Form.item
   */
  tag: string
  /**
   * 所属组件
   * @example Form
   */
  component: string
  /**
   * 默认值
   */
  defaultValue: string
  /**
   * 是否必须
   */
  required: boolean
  /**
   * 其他的属性
   */
  [key: string]: unknown
}

/**
 * 解析 JSDoc
 */
function resolveDesc(desc: string) {
  const macths = desc.match(matchDesc)
  if (macths) {
    return macths
      .map(it => it.trim())
      .reduce((acc, cur) => {
        const [_prop, value] = cur.split(' ')
        const [, prop] = _prop.split('@')
        acc[prop] = value;
        return acc
      }, {} as {
        [prop: string]: string
      })
  } else {
    return {}
  }
}
/**
 * 处理所有的属性
 */
function resolveProps(props: Props) {
  const keys = Object.keys(props);
  const arr =  keys.map(key => {
    const raw = props[key];
    const { required,name,tags } = raw;
    const {component,description,tag,default:defaultValue = ''} = tags as SUPPORT_KEY & {
      [key:string]:string
    }
    return {
      defaultValue:defaultValue,
      prop:name,
      required: required,
      component,
      description,
      tag,
      _raw:raw
    }
  })   
  return arr;  
}
/**
 * 处理所有的ComponentDoc
 */
function resolveDocs(docs: ComponentDoc[]) {
  return docs.reduce((acc,{props,displayName}) => {
     acc[displayName] = resolveProps(props)
    return acc
  }, {} as {
    [component: string]: Scheme[]
  })
}
export function buildScheme({ filePath, componentName }: IBuildScheme) {
  const isExist = fs.existsSync(filePath)
  if (!isExist) throw Error(`${filePath} not found!`)
  const docs = parse(filePath, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldIncludePropTagMap:true,
    componentNameResolver: source => {
      // use parsed component name from remark pipeline as default export's displayName
      return DEFAULT_EXPORTS.includes(source.getName()) ? componentName : undefined;
    },
  })
  return resolveDocs(docs)  
}
