const express = require('express');
const {dbConection} = require('../database/config.js');
const cors = require('cors');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth"
        this.middlewares();
        this.conexion();
        this.routes();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    async conexion(){
        await dbConection();
    }
    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios.routes.js'))
        this.app.use(this.authPath,require('../routes/auth.routes.js'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Conectado el server ${this.port}`);
        })
    }
}
module.exports = Server