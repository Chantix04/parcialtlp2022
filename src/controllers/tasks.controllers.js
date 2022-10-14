const Tasks = require('../models/Tasks');
ctrlTasks = {};

ctrlTasks.postTasks = async (req, res) => {

    const { title, description, categories } = req.body;

    try { 

        const newTask = new Tasks({
            title,
            description,
            categories,
            userId:req.user._id
        });
        await newTask.save()
       res.json("tarea creada")
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al crear la tarea'
        })
    }
}

    ctrlTasks.getTasks = async (req, res) =>{
        
        const obtenerTask = await Tasks.find({userId:req.user._id, isActive:true,isDone:false})
        res.json(obtenerTask)
    }

    ctrlTasks.putTasks = async (req, res) =>{
        const id = req.params.id
        const {title, description} = req.body 
        
        if (!id || !title || !description ){
            return res.status(400).json({
                msg: 'No viene id en la petición'
            })
        }
        try {
            
            const actualizarTarea = await Tasks.findByIdAndUpdate (id,{title,description});
            if (actualizarTarea===null){
                return res.status(400).json({
                    msg:'Error al actualizar la tarea - id incorrecto.'
                })
            }
            return res.json("tarea actualizada")

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg:'Error al actualizar la tarea'
            })
        }

    }     

    ctrlTasks.deleteTasks =  async (req,res) =>{

        const id = req.params.id;
        try {

            const eliminarTarea = await Tasks.findByIdAndUpdate({_id:id,userId:req.user._id},{isActive:false})
    
            res.json(eliminarTarea + "Tarea eliminada correctamente.")

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                msg:"Error al eliminar la tarea."
            })
        }
    }
    
    ctrlTasks.completeTasks =  async (req,res) =>{
        const id = req.params.id;
        const { title, description, ...otroDatos } = req.body;
    
        try {
    
            const taskCompleted = await Tasks.findByIdAndUpdate(id, { title, description,isDone:true})
            if (taskCompleted === null){
                return res.status(400).json({
                    msg:'Error al completar la tarea - id incorrecto.'
                })
            }
            res.json("Tarea marcada como completada.")
    
        } catch (error) {
    
            console.log(error.message);
            return res.status(500).json({
                msg:"Error al marcar la tarea como completada"

            })
    
        }
    }

module.exports = ctrlTasks;

