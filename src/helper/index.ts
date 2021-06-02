import {matchDesc} from './regExp'
/**
 * 解析 JSDoc
 */
 export function resolveDesc(desc: string) {
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
  
export function isEmptyObject(obj:Record<string,unknown>){
   return  Object.keys(obj).length === 0;
}