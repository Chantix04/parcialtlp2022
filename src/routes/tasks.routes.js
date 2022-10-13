const routerTasks = require('express').Router();
const validarJWT = require('../middlewares/validar-jwt')
const {
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
} = require('../controllers/tasks.controllers');

routerTasks.get('/tasks', validarJWT ,getTasks)
routerTasks.post('/tasks', validarJWT ,postTasks)
routerTasks.put('/tasks/:id', validarJWT ,putTasks)
routerTasks.delete('/tasks/:id', validarJWT ,deleteTasks)

module.exports = routerTasks;