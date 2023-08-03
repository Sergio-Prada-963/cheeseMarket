const roles = require ('../models/role.js');
const usuarios = require('../models/usuarios.js');
const isValidRole = async(rol= '')=>{
    const existeRol = await roles.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

 const emailExiste = async( email = '' ) => {
    const existeEmail = await usuarios.findOne({email});
    if(existeEmail){
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
 }
 const userExistsById = async( id ) => {
    const userExists = await usuarios.findById(id);
    if ( !userExists ) {
        throw new Error(`El id (usuario) no existe ${ id }`);
    }
}
module.exports = {
    isValidRole,
    emailExiste,
    userExistsById
}