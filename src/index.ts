import fs from 'fs-extra'
import { ComponentDoc, parse, PropItem, Props, ParserOptions } from './core'
import { DEFAULT_EXPORTS, SUPPORT_KEY } from './constant'
import { isEmptyObject } from './helper'
import { matchQuota } from './helper/regExp'

interface IBuildScheme {
  filePath: string
  componentName?: string
  parseOptions?: ParserOptions
}
interface Scheme {
  /**
   * 属性名
   */
  prop: string
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
   * 嵌套子属性
   */
  child: Scheme[]
  /**
   * 枚举值
   */
  enumValue?: string[]
  /**
   * 其他的属性
   */
  [key: string]: unknown
}

/**
 * 处理所有的属性
 */
function resolveProps (props: Props): Scheme[] {
  const keys = Object.keys(props)
  const arr = keys.map(key => {
    const raw = props[key]
    const {
      required,
      name,
      tags,
      sub = {},
      type: { name: type, value: _enumValue }
    } = raw
    const {
      component,
      description,
      tag,
      default: defaultValue = ''
    } = tags as SUPPORT_KEY & {
      [key: string]: string
    }
    let enumValue: string[] = []
    if (type === 'enum') {
      const values = _enumValue.map((it: { value: string }) =>
        it.value.trim().replace(matchQuota, '$1')
      )
      enumValue = values
    }
    const result = {
      defaultValue: defaultValue,
      prop: name,
      required: required,
      component,
      description,
      tag,
      enumValue,
      child: [],
      _raw: raw
    }
    // 如果 sub 存在, 说明是接口,  则递归解析嵌套的 interface
    if (!isEmptyObject(sub)) {
      const _sub = resolveProps(sub)
      return {
        ...result,
        child: _sub
      }
    }
    return result
  })
  return arr
}
/**
 * 处理所有的ComponentDoc
 */
function resolveDocs (docs: ComponentDoc[]) {
  return docs.reduce(
    (acc, { props, displayName }) => {
      acc[displayName] = resolveProps(props)
      return acc
    },
    {} as {
      [component: string]: Scheme[]
    }
  )
}

const defaultOptions:ParserOptions = {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldIncludePropTagMap: true,
  }
export function buildScheme ({
  filePath,
  componentName,
  parseOptions 
}: IBuildScheme) {
  const isExist = fs.existsSync(filePath)
  if (!isExist) throw Error(`${filePath} not found!`)
  const options =  {...defaultOptions,...parseOptions}
  const docs = parse(filePath, {
      ...options,
      componentNameResolver: source => {
        // use parsed component name from remark pipeline as default export's displayName
        return DEFAULT_EXPORTS.includes(source.getName())
          ? componentName
          : undefined
      }
  })
  return resolveDocs(docs)
}
