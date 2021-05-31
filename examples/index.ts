import {buildScheme} from '../src'
import fs from 'fs';
import path from 'path'

function run(){
    const filePath = path.resolve(__dirname,'components/index.tsx')
    const scheme =  buildScheme({
        filePath,
        componentName: 'Cropper'
    })
}

run()