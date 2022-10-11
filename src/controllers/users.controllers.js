const User = require("../models/User");
const bcrypt = require('bcrypt');
const ctrlUser = {};

ctrlUser.getUsers = async (req,res)=>{
    const users = await User.find()
    return res.json({
        msg: 'GET - getUsers',
        users
    })
}

//CONTROLADOR PARA CREAR UN NUEVO USUARIO 
ctrlUser.postUsers = async (req,res)=>{
    //SE DESESTRUCTURAN LOS DATOS 
    const { name,email, password:passwordRecibida, ...otrosDatos} = req.body;
    //ENCRIPTAMOS LA CONTRASEÑA DEL USUARIO

    const newPassword = bcrypt.hashSync(passwordRecibida, 10)

    //SE CREA UN NUEVO USUARIO 
    const nuevoUsuario = new User({
        name,
        password: newPassword,
        email
    });

    try {
        const usuario = await nuevoUsuario.save();
        //RESPUESTA DEL SERVIDOR
        return res.json('El usuario ha sido guardado con éxito.');
    } catch (error) {
        console.log(err)
    }
}

ctrlUser.putUsers = async (req,res) =>{
    //Request handler || manejador de errores

    const id = req.params.id;
    const { name, email, password, ...otrosDatos } = req.body;

    if (!id || !name || !email || !password) {
        return res.status(400).json({
            msg: "No viene id en la petición."
        });
    };

    try {
        const userActualizado = await User.findByIdAndUpdate(id,{name,email,password})
        return res.json({
            msg: 'Usuario actualizado correctamente'
        });
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg:"Error al actualizar el usuario"
        })
    }
}