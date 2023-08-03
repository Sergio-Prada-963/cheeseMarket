const {Router} = require('express');
const {check} = require('express-validator');
const {validateDocuments} = require('../middlewares/validate.documents.js')
const {isAdminRole} = require('../middlewares/validate.role.js')
const {validateJWT} = require('../middlewares/validate.jwt.js')
const { isValidRole, emailExiste, userExistsById } = require('../helpers/db.validators.js');

const {obtenerUsuarios, agregarUsuarios, deleteUsuario, updateUsuario, putUsuarios} = require('../controllers/usuarios.controllers.js');

const router = Router();
router.get("/",obtenerUsuarios);

router.post("/",[
    check('nombre','Name is not valid').not().isEmpty(),
    check('password','password require min six caracters').isLength({min: 6}),
    check('email','El correo no es validoooooooo').isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom(isValidRole),validateDocuments
],agregarUsuarios);

router.delete("/:id",[
    validateJWT,isAdminRole,   
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    validateDocuments
],deleteUsuario);

router.put("/:id",[
    check('id', 'No es un ObjectID MongoDB válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('rol').custom(isValidRole),validateDocuments
], putUsuarios );

router.patch("/:id",updateUsuario);

module.exports = router;
