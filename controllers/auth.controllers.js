const {response} = require('express');
const Usuarios = require('../models/usuarios.js')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate.JWT.js');
const usuarios = require('../models/usuarios.js');
const login = async (req, res=response)=>{
    const {email, password} = req.body
    //const newUser = new Usuarios(req.body)
    try {
        /// si email existe
        const usuario = await Usuarios.findOne({email});
        if(!usuario)
            return res.status(400).json({eerror:'Usuario no registrado'});

        /// verificar si esta activo
        if((usuario.estado) === false)
            return res.status(400).json({eerror:'El usuario esta inactivo'});

        /// password conincide con la llave
         const passwordValidation = bcryptjs.compareSync(password, usuario.password);
         if(!passwordValidation)
            return res.status(400).json({eerror:'El password no es correcto'});
        console.log(password);
        if(password === usuario.password)
            return res.status(400).json({siii:'funshionnnn'});

        //generacion para json web token
        const token = await generateJWT(usuario.id)
        res.json({usuario,token});
        //funshion
        //const nuevoUser = await newUser.save()
        /* res.json(nuevoUser) */
        //res.json({msg: "Funciona mi loko :) -- funshion my craisyy"})

    } catch (error) {
        console.log("no funshion",error);
    }
}
module.exports = {login}