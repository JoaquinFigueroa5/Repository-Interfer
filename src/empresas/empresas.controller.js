import Empresa from "./empresas.model.js";

export const saveEmpresa = async(req, res) => {
    try {
        const data = req.body;
        const clientes = req.body.clientes;
        
        const empresa = new Empresa({
            empresa: data.empresa,
            clientes: clientes
        });

        await empresa.save();

        console.log("hola")

        res.status(200).json({
            success: true,
            empresa,
            clientes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al agregar la empresa",
            error: error.message 
        })
    }
}

export const getEmpresa = async(req, res) => {
    try {
        const { limit = 10, desde = 0 } = req.query;
        const query = { state: true };

        const [total, empresa] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .skip(Number(desde))
                .limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            msg: "Empresas obtenidas con exito",
            total,
            empresa
        })
    } catch (error) {
        
    }
}