const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { postCategoria, getCategoria, deleteCategoria } = require('../controllers/categoria.controller.js');

const router = Router();

router.get('/',getCategoria)
router.delete('/:id',deleteCategoria)
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );

module.exports = router;