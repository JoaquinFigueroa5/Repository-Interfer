import { Router } from 'express';
import { check } from 'express-validator';
import { saveEmpresa, getEmpresa } from './empresas.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    '/submit',
    [
        validarJWT,
        validarCampos,
    ],
    saveEmpresa
)

router.get('/', getEmpresa)

export default router;