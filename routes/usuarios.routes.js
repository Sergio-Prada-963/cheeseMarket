const {Router} = require('express');
const {check} = require('express-validator');
const {validateDocuments} = require('../middlewares/validate.documents.js')
const {obtenerUsuarios, agregarUsuarios, deleteUsuario, updateUsuario} = require('../controllers/usuarios.controllers.js');
const router = Router();
const roles = require('../models/role.js') 
router.get("/",obtenerUsuarios);
router.post("/",[
    check('nombre','Name is not valid').not().isEmpty(),
    check('password','password require min six caracters').isLength({min: 6}),
    check('email','El correo no es validoooooooo').isEmail(),
    /* check('rol','It is not rol valid').isIn(['ADMIN','USER']), */
    check('rol').custom(async(rol='')=>{
         const existeRol = await roles.findOne({rol});
         if(!existeRol)
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }),
    validateDocuments
],agregarUsuarios);
router.delete("/:id",deleteUsuario);
router.patch("/:id",updateUsuario);

module.exports = router;
