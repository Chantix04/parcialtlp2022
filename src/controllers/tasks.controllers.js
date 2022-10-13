const Tasks = require('../models/Tasks');
ctrlTasks = {};

ctrlTasks.postTasks = async (req, res) => {
    const { title, description, categories } = req.body;

    const newTask = new Tasks({
        title,
        description,
        categories,
        userId:req.user._id
    });
    await newTask.save()
   res.json("tarea creada")
}

    ctrlTasks.getTasks = async (req, res) =>{
        
        const obtenerTask = await Tasks.find({userId:req.user._id, isActive:true,isDone:false})
        res.json(obtenerTask)
    }

    ctrlTasks.putTasks = async (req, res) =>{
        const id = req.params.id
        const {title, description} = req.body 
        const actualizarTarea = await Tasks.updateOne({_id:id,userId:req.user._id},{
            
            $set: {
                title, description
            }
        });
        res.json("tarea actualizada")
    

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
        const {id} = req.params;
        const {_id} = req.user
        try {
            
            const completeTask = await Tasks.findByIdAndUpdate({_id:id,userId:_id},{isDone:true})
            res.json("Tarea marcada como completada.")

        } catch (error) {

            console.log(error.message);
            return res.status(500).json({
                msg:"Error al marcar la tarea como completada"
            })

        }
    }

module.exports = ctrlTasks;

