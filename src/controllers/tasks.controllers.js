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
        const obtenerTask = await Tasks.find({userId:req.user._id})
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
        const {title,description} = req.body
        const eliminarTarea = await Tasks.deleteOne({_id:id,userId:req.user._id})
    
        res.json(eliminarTarea + "tarea eliminada")
    }
    
    

module.exports = ctrlTasks;

