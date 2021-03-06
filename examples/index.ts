import {buildScheme} from '../src'
import fs from 'fs-extra';
import path from 'path'

function run(){
    const filePath = path.resolve(__dirname,'components/index.tsx')
    const scheme =  buildScheme({
        filePath,
        componentName: 'Cropper'
    })
    console.log((scheme.Cropper[0] as any)._raw.declarations);
    
    // output(scheme)
}
function output(scheme:any,file = path.resolve(__dirname,'result.json')){
    fs.ensureFileSync(file)
    fs.writeJSON(file,scheme)
}

run()