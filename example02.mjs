import http from 'http'

import { readFileSync, createReadStream } from 'fs'
http.createServer((req, res)=>{
    // const file = readFileSync('big.file') //.toString()
    // res.write(file)
    // res.end()
    createReadStream("big.file")
    .pipe(res)
}).listen(5000, console.log('runnig at 5000'))

