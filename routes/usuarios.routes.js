const {Router} = require('express');
const {obtenerUsuarios, agregarUsuarios, deleteUsuario, updateUsuario} = require('../controllers/usuarios.controllers.js');
const router = Router();

router.get("/",obtenerUsuarios);
router.post("/",agregarUsuarios);
router.delete("/:id",deleteUsuario);
router.patch("/:id",updateUsuario);

module.exports = router;
