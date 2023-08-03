const express = require('express');
const {dbConection} = require('../database/config.js');
const cors = require('cors');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.paths = {
            authPath: '/api/auth',
            categoriasPath: '/api/categorias',
            usuariosPath: '/api/usuarios'
        }
        /* this.middlewares(); */
        this.conexion();
        this.routes();
    }
    /* middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
    } */
    async conexion(){
        await dbConection();
    }
    routes(){
        this.app.use(this.paths.authPath,require('../routes/usuarios.routes.js'))
        this.app.use(this.paths.categoriasPath,require('../routes/categoria.routes.js'))
        this.app.use(this.paths.usuariosPath,require('../routes/auth.routes.js'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Conectado el server ${this.port}`);
        })
    }
}
module.exports = Server