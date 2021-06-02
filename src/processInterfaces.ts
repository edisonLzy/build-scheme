/**
 * interface B {
 *   name:string
 * }
 * interface A {
 *    style: B
 * }
 */
import ts from 'typescript'
export function processInterfaces (propType: ts.Type) {
    console.log(propType);
    const interfaceName = propType.
}
