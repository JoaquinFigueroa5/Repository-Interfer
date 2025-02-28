import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validator.js";
import { deleteFileOnError } from "../middlewares/deleteFileOnError.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    '/login',
    loginValidator,
    login
);

router.post(
    '/register',
    validarJWT,
    registerValidator,
    deleteFileOnError,
    register
);

export default router;