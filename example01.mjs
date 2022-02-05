
const stdin = process.stdin
.on('data', msg => console.log('data terminal :: ', msg.toString()))

const stdout = process.stdout 
.on('data', msg=> console.log('saída do terminal :: ', msg.toString()))
stdin.pipe(stdout)