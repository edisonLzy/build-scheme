import { DEFAULT_EXPORTS } from './constant'
import { ComponentDoc, parse, Props, withCompilerOptions } from 'react-docgen-typescript'
import { ParserOptions } from 'react-docgen-typescript'
import fs from 'fs-extra'
import { matchDesc } from './regExp';

interface IBuildScheme {
  filePath: string
  componentName: string
}
interface Scheme {
  /**
   * 组件名称 
   * @example Form.item
   */
  tag: string
  /**
   * 所属组件
   * @example Form
   */
  type: string
  /**
   * 默认值
   */
  defaultValue:string
  /**
   * 是否必须
   */
  required: boolean
  /**
   * 其他的属性
   */
  [key:string]:unknown
} 

/**
 * 处理 description 
 */
function resolveDesc(desc:string){
   console.log(desc.match(matchDesc));
}
/**
 * 处理所有的属性
 * @param docs 
 * @returns 
 */
function resolveProps(props:Props){
   const keys = Object.keys(props);   
   return keys.map(key=>{
      const {description,defaultValue,required} = props[key];
      const _defaultValue = defaultValue === null ? '':defaultValue.value
      const otherPropsInDesc = resolveDesc(description)
      return {
        defaultValue: _defaultValue,
        required: required
      }
   })
  //  return    
} 
/**
 * 处理所有的ComponentDoc
 */
function resolveDocs(docs:ComponentDoc[]){
 return docs.reduce((acc,doc)=>{     
    resolveProps(doc.props)
    //  acc[displayName] =
     return acc
 },{} as {
   [component:string]:Scheme[]
 })
}
export function buildScheme ({ filePath,componentName }: IBuildScheme,) {
  const isExist = fs.existsSync(filePath)
  if (!isExist) throw Error(`${filePath} not found!`)
  const docs = parse(filePath,{
    savePropValueAsString: true,
    shouldExtractValuesFromUnion:true,
    shouldExtractLiteralValuesFromEnum:true,
    componentNameResolver: source => {      
      // use parsed component name from remark pipeline as default export's displayName
      return DEFAULT_EXPORTS.includes(source.getName()) ? componentName : undefined;
    },
  })
  const result = resolveDocs(docs)
}
