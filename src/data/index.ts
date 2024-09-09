import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit() // o exit(0) (Finaliza correctamente)
    } catch (error) {
        console.log(error)
        exit(1) // Finaliza con errores
    }
}

if(process.argv[2] === '--clear'){
    clearDB()
}