import {Schema, model} from 'mongoose';

const EmpresaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    impacto: {
        type: String,
        enum: ['ALTO', 'MEDIO', 'BAJO'],
        required: [true, 'El impacto es obligatorio']
    },
    trayectoria: {
        type: Number,
        required: [true, 'La trayectoria es obligatoria']
    },
    clientes: [{
        type: String,
        required: true
    }],
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    }
});

export default model('Empresa', EmpresaSchema)