const router = require('express').Router();
// const esAdmin = require('../middlewares/es-admin');
const validarJWT = require('../middlewares/validar-jwt');
const {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
} = require('../controllers/users.controllers');

router.get('/users', [validarJWT], getUsers);
router.post('/users',[],postUsers);
router.put('/users/:id', [validarJWT], putUsers);
router.delete('/users/:id', [validarJWT] , deleteUsers);



module.exports = router;
