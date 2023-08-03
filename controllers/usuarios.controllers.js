const Usuario = require('../models/usuarios.js');
const bcryptjs = require('bcryptjs');
const obtenerUsuarios = async(req,res)=>{
    try {
        const usuario = await Usuario.find();
        res.json(usuario)
    } catch (error) {
        console.log(error);
    }
}
const agregarUsuarios = async (req,res)=>{

    const {nombre, email, password, rol} = req.body;
    const usuario = new Usuario({nombre, email, password, rol});

    //Verificar si el correo y aexiste
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail)
        return res.status(400).json({
            message: "Email alreadi exist"
        })

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json(usuario);
}
const deleteUsuario = async (req,res)=>{
    try {
        await Usuario.deleteOne({_id:req.params.id});
        res.send({message:"eliminado con exito"})
    } catch (error) {
        console.log(error);
        res.status(333) 
        res.send({error: "usuario no eliminado"})
    }
}
const putUsuarios = async (req, res)=>{
    const { id } = req.params;
    const { _id, password, googleSignIn, ...resto } = req.body;
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    res.json({
        msg:"Usuario Actualizado",
        usuario : usuario
    });
}
const updateUsuario = async(req,res) =>{
    try {
        const usuario = await Usuario.findOneAndUpdate({_id: req.params.id},req.body,{new:true});
        res.json(usuario)
    } catch (error) {
        console.log(error);
        res.status(333)
    }
}
module.exports = {obtenerUsuarios, agregarUsuarios, deleteUsuario, putUsuarios, updateUsuario};