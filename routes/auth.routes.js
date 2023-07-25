const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/auth.controllers.js')
const router = Router()
const {validateDocuments} = require('../middlewares/validate.documents.js')

router.post("/login",[check('email','falta el email...').isEmail(),check('password','la password es required').not().isEmpty(),validateDocuments],login)

module.exports = router