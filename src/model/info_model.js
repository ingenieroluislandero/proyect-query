const mongoose = require('mongoose');
const {Schema} = mongoose;

const infoSchema = new Schema({
    fecha: {type:String, required: true},
    departamento: {type:String, required: true},
    municipio: {type:String, required: true},
    d_a: {type:String, required: true},
    hora: {type:String, required: true},
    barrio: {type:String, required: true},
    zona: {type:String, required: true},
    clase_de_sitio: {type:String, required: true},
    arma_empleada: {type:String, required: true},
    m_vil_agresor: {type:String, required: true},
    m_vil_victima: {type:String, required: true},
    edad: {type:String, required: true},
    sexo: {type:String, required: true},
    estado_cibil: {type:String, required: true},
    p_s_de_nacimiento: {type:String, required: true},
    clase_de_empleo: {type:String, required: true},
    profesi_n: {type:String, required: true},
    escolaridad: {type:String, required: true},
    c_digo_dane: {type:String, required: true},
    cantidad: {type:String, required: true}
})

module.exports = mongoose.model('Info',infoSchema);