const User = require("../models/User");
const bcrypt = require('bcrypt');
const ctrlUser = {};

ctrlUser.getUsers = async (req,res)=>{
    try {
        const users = await User.find({isActive:true})
    return res.json({
        msg: 'GET - getUsers',
        users
    })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: 'Error al encontrar el usuario'
        })
    }
}

//CONTROLADOR PARA CREAR UN NUEVO USUARIO 
ctrlUser.postUsers = async (req,res)=>{
    //SE DESESTRUCTURAN LOS DATOS 
    const { username,email, password,role} = req.body;
    //ENCRIPTAMOS LA CONTRASEÑA DEL USUARIO

    const newPassword = bcrypt.hashSync(password, 10)

    //SE CREA UN NUEVO USUARIO 
    const nuevoUsuario = new User({
        username,
        password: newPassword,
        email,
        role
    });

        const guardarusuario = await nuevoUsuario.save();
        //RESPUESTA DEL SERVIDOR
        res.json(guardarusuario);
    
}

ctrlUser.putUsers = async (req,res) =>{
    //Request handler || manejador de errores

    const id = req.params.id;
    const { username, email, password,role, ...otrosDatos } = req.body;

    if (!id || !username || !email || !password || !role) {
        return res.status(400).json({
            msg: "No viene id en la petición."
        });
    };

    try {
        const userActualizado = await User.findByIdAndUpdate(id,{username,email,password,role})
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
ctrlUser.deleteUsers = async(req,res) => {
    const id = req.params.id 
    try {
        await User.findByIdAndUpdate(id,{isActive:false})
        return res.json('Usuario eliminado correctamente')
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg:"Error al eliminar el usuario."
        })
    }
}

module.exports = ctrlUser;