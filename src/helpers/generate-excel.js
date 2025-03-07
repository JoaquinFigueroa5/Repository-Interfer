import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Empresa from "../empresas/empresas.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const exportToExcel = async (req, res) => {
    try {
        const empresas = await Empresa.find().lean();

        if (!empresas.length) {
            return res.status(404).json({ 
                success: false, 
                msg: "No hay datos para exportar" 
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Empresa");

        worksheet.columns = [
            { header: "ID", key: "_id", width: 30 },
            { header: "Nombre", key: "name", width: 40 },
            { header: "Nivel de impacto", key: "impacto", width: 10 },
            { header: "Trayectoria", key: "trayectoria", width: 7 },
            { header: "Clientes", key: "clientes", width: 50 },
            { header: "Categoria", key: "categoria", width: 20 },
            { header: "Estado", key: "state", width: 15 },
        ];

        empresas.forEach(empre => {
            const clientes = empre.clientes.join(", ");
            worksheet.addRow({
                ...empre,
                clientes
            });
        });
        const reportsDir = path.join(__dirname, "./reports")

        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        const filePath = path.join(reportsDir, "Empresas.xlsx");

        await workbook.xlsx.writeFile(filePath);        

        res.download(filePath, "Empresas.xlsx", (err) => {
            if (err) {
                console.error("Error al enviar el archivo:", err);
                res.status(500).json({ 
                    success: false, 
                    msg: "Error al generar el archivo" 
                });
            }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            msg: "Error al exportar a Excel", 
            error: error.message 
        });
    }
};
