const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI)
// .then( ()=>console.log('Conectado a la BD'))
// .catch(err=>{
//     console.log('Error al conectar a la BD')
// })

const conectarBD = async ()=>{
    
    try{
        mongoose.connect(process.env.MONGODB_URI)
    }  catch (error){
        throw new Error('Error a la hora de conectar a la BD, ver logs'),
        console.log(error.message);
    }
};
module.exports = conectarBD;