const Usuario = require('../models/usuarios.js');
const obtenerUsuarios = async(req,res)=>{
    try {
        const usuario = await Usuario.find();
        res.json(usuario)
    } catch (error) {
        console.log(error);
    }
}
const agregarUsuarios = async (req,res)=>{
    const usuarios = new Usuario(req.body);
    try {
        const newUsuario = await usuarios.save();
        res.json(newUsuario);
    } catch (error) {
        console.log(error);
    }
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
const updateUsuario = async(req,res) =>{
    try {
        const usuario = await Usuario.findOneAndUpdate({_id: req.params.id},req.body,{new:true});
        res.json(usuario)
    } catch (error) {
        console.log(error);
        res.status(333)
    }
}
module.exports = {obtenerUsuarios, agregarUsuarios, deleteUsuario, updateUsuario};