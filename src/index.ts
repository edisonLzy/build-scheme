import {Project} from 'ts-morph'
import {processInterfaces} from './parser'
interface BuildScheme{
    filePath: string
    componentName: string
}

export function buildScheme({
    filePath,
    componentName
}:BuildScheme){
  const project = new Project();
  project.addSourceFileAtPath(filePath)
  const sourceFile = project.getSourceFile(filePath);
  if(sourceFile){
      // 获取 sourceFile 对应的目录
      const directory = sourceFile.getDirectory();
      // 
      const interfaces = sourceFile.getInterfaces();
      processInterfaces(interfaces)      
  } 
}