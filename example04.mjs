import { pipeline, Readable, Writable, Transform } from "stream";
import { createWriteStream} from 'fs'
import { promisify } from "util";

const pipelineSync = promisify(pipeline)
{
    const readableStream = Readable({
        read: function () {
            this.push("Hello Dude")
            this.push("Hello Dude")
            this.push("Hello Dude")
            this.push(null)
        }
    })

    const writableStream = Writable({
        write(chunck, enconding, cb) {
            console.log('writable msg :: ', chunck.toString())
            cb()
        }
    })

    pipelineSync(
        readableStream,
        // process.stdout
        writableStream
    )
}
{
    const readableStream = Readable({
        read() {
            for (let index = 0; index < 1e5; index++) {
                const person = { id: Date.now() + index, name: `Crystyan - ${index}\n` }
                const data = JSON.stringify(person)
                this.push(data)
            }
            //avisando que acabou os dados de entrada
            this.push(null)
        }
    })

    const mapToCSV = Transform({
        transform(chunck, enconding, cb) {
            const data = JSON.parse(chunck)
            //alterar o valor original dos dados de entrada que é nosso objeto gerado no writable
            const result = `${data.id}, ${data.name.toUpperCase()} `

            //aqui temos que retornar o objeto
            cb(null, result)
        }
    })

    const setHeader = Transform({
        transform(chunck, enconding, cb) {
            //a propriedade existe ?? sim = retorna a propriedadade antes de ??  não = retorna 0
            this.counter = this.counter ?? 0
            if (this.counter) {
                return cb(null, chunck)
            }

            this.counter += 1
            //retorna na primeira execução já que this.counter = 0 == false 
            //logo é nosso header 
            cb(null, "id, name\n".concat(chunck))
        }
    })

    pipelineSync(
        readableStream,
        mapToCSV,
        setHeader,
        // createWriteStream('file.csv')
         process.stdout
        // writableStream

    )
}