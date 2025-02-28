import User from "../users/user.model.js";
import argon2 from 'argon2'

export const adminDefault = async() => {
    try {
        const adminExists = await User.findOne({ email: "hfigueroa@gmail.com"});
        if(!adminExists){
            const hashedPassword = await argon2.hash("Joaquin2007");

            const adminD = new User({
                name: "Joaquin",
                surname: "Figueroa",
                username: "Joaki",
                email: "hfigueroa@gmail.com",
                password: hashedPassword,
                phone: "58694127"
            })

            await adminD.save();
            console.log("ADMIN creado con exito");
        }else{
            console.log("ADMIN ya existente");
        }
    } catch (error) {
        console.log("Error al crear el ADMIN")
    }
}