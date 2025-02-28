import Empresa from "./empresas.model.js";

export const saveEmpresa = async(req, res) => {
    try {
        const data = req.body;
        const clientesArray = Array.isArray(data.clientes) ? data.clientes : [data.clientes];
        
        const empresa = new Empresa({
            name: data.name,
            impacto: data.impacto,
            trayectoria: data.trayectoria,
            categoria: data.categoria,
            clientes: clientesArray
        });

        await empresa.save();

        res.status(200).json({
            success: true,
            empresa
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al agregar la empresa",
            error: error.message 
        })
    }
}

export const getEmpresa = async(req = request, res = response) => {
    const { ordenar  } = req.query;
    const query = { state: true };

    try {
        const [total, empresa] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort(
                    ordenar === "trayectoria" ? { trayectoria: 1 } : 
                    ordenar === "asc" ? { name: 1 } :
                    ordenar === "desc" ? { name: -1 } :
                    ordenar === "categoria" ? { categoria: 1 } : 
                    undefined)
        ]);

        return res.status(200).json({
            success: true,
            msg: "Empresas obtenidas con éxito",
            total,
            empresa
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al obtener las empresas",
            error: error.message || error
        });
    }
};


export const updateEmpresas = async(req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const updateEmpresa = await Empresa.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Empresa actualizada con exito',
            empresa: updateEmpresa
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la empresa",
            error: error.message || error
        })
    }
}