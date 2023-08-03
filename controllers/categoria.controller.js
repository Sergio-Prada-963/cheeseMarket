const Categoria = require('../models/Categoria.js');
const postCategoria = async(req,res)=>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre})
    if ( categoriaDB )
        return res.status(400).json({msg: `La categoria ${ categoriaDB.nombre }, ya existe`});
    console.log("usuario:",usuario);
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria( data );
    await categoria.save();
    res.status(201).json(categoria);
}
const getCategoria = async(req,res)=>{
    const categoria = await Categoria.find();
    res.json(categoria)
}
const deleteCategoria = async(req,res)=>{
    await Categoria.deleteOne({_id:req.params.id});
    res.status(200).send()
}
const putCategoria = async(req,res)=>{
    try {
        const categoria = await Categoria.findOneAndUpdate({_id: req.params},req.body,{new:true});
        res.json(creyente)
    } catch (error) {
        res.status(404)
        res.send({error: "No funshion :("})
    }
}
module.exports = {
    postCategoria,
    getCategoria,
    deleteCategoria,
    putCategoria
}