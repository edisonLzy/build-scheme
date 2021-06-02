import { parse } from '../src'
import fs from 'fs-extra'
import path from 'path'

function run () {
  const filePath = path.resolve(__dirname, 'components/index.tsx')
  const scheme = parse(filePath, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldIncludePropTagMap:true,
  })
  console.log(scheme[0].props)
  // output(scheme)
}
function output (scheme: any, file = path.resolve(__dirname, 'result.json')) {
  fs.ensureFileSync(file)
  fs.writeJSON(file, scheme)
}

run()
