import { body } from 'express-validator'
import { validarCampos } from './validar-campos.js'
import { existenteEmail,  esRolValido} from '../helpers/db-validator.js'

export const registerValidator = [
    body('name', 'Name is required').not().isEmpty(),
    body('surname', 'Surname is required').not().isEmpty(),
    body('email', 'You must enter a valid email').isEmail(),
    body('email').custom(existenteEmail),
    body('password', "Password must be at least 6 chraracters").isLength({min: 6}),
    validarCampos
];

export const loginValidator = [
    body("username").optional().isString().withMessage("Enter a valid username"),
    body("password", "Password must be at least 6 characters").isLength({min: 8}),
    validarCampos
]

