import {hash, verify} from 'argon2';
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-JWT.js';

export const login = async(req, res) => {
    const { email, password, username } = req.body;

    try {
        
        const user = await Usuario.findOne({ email })

        if(req.body.username){
            return res.status(400).json({
                msg: 'Solo puede inciar sesion mediante email'
            })
        }

        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, usuario no existe en la base de datos'
            });
        }

        if (!user.state) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }
        console.log(user.password)
        console.log(password)
        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta, bobo'
            })
        }
        console.log("Hola")

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Inicio de sesion exitoso!',
            userDetails: {
                username: user.username,
                token: token,
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server error",
            error: e.message
        })
    }
}

export const register = async(req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password);

        const user = await Usuario.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: encryptedPassword,
            role: data.role
        })

        return res.status(201).json({
            message: "User registered successfully",
            userDetails: {
                user: user.email
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "User registration failed",
            error: error.message
        })
    }
}