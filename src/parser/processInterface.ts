import type {InterfaceDeclaration,JSDoc,PropertySignature} from 'ts-morph'
import {} from 'ts-morph'

function processJsDoc(docs:JSDoc[]){
    docs.forEach(doc=>{
        doc.getTags().forEach(tag=>{
            console.log(tag.getTagName(),tag.getCommentText());
            
        })
    })
}
function processInterfaceProperties(properties:PropertySignature[]){
   for (const property of properties) {
     const jsDocs = property.getJsDocs()
     const docs = processJsDoc(jsDocs)

     const nodes = property.getChildren()
     nodes.forEach(node=>{
        if(node.getKindName() === 'TypeReference'){
            node.forEachChild(child=>{
                const compilerNode = child.compilerNode
                const isInterface = child.getType().isInterface();
                if(isInterface){                    
                }
            })
            
        }
     })     
   }
    
}
export function processInterfaces(interfaces:InterfaceDeclaration[]){
    for (const _interface of interfaces) {
        const name = _interface.getName();
        const properties = _interface.getProperties()
        processInterfaceProperties(properties)
    }
}