import { Router } from 'express';
import { check } from 'express-validator';
import { saveEmpresa, getEmpresa, updateEmpresas } from './empresas.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { exportToExcel } from "../helpers/generate-excel.js";

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

router.get('/descargar-excel', exportToExcel)

router.put(
    '/:id',
    [
        validarJWT,
        validarCampos
    ],
    updateEmpresas
)

export default router;