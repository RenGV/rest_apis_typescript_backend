import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// * CONEXION A BD
//const db = new Sequelize('postgresql://rest_api_node_typescript_20kq_user:gEQ1CSLddhQDOtOXq9iVmvoxEhAWsy4B@dpg-cr36k78gph6c739a95v0-a.oregon-postgres.render.com/rest_api_node_typescript_20kq?ssl=true')

// * ALTERNATIVA
// const db = new Sequelize('postgresql://rest_api_node_typescript_20kq_user:gEQ1CSLddhQDOtOXq9iVmvoxEhAWsy4B@dpg-cr36k78gph6c739a95v0-a.oregon-postgres.render.com/rest_api_node_typescript_20kq',{
//     dialectOptions: {
//         ssl: {
//             require: false
//         }
//     }
// })

// * Usando Variable de Entorno
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false // Bloquear que envie mensaje a la consola
})

export default db