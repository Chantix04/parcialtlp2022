//SERVIDOR EXPRESS
//IMPORTACIONES DE LIBRERÍAS QUE NECESITARÁ EL PROYECTO

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const conectarBD = require('../databases/connection');

require('dotenv').config();
// require('ejs');

//Se inicializa la librería express

const app = express();

//Configuraciones

app.use(express.json());
const port = process.env.PORT || 3000;
conectarBD();

//MIDDLEWARES (FUNCIONES QUE SE VAN A ANTEPONER A LAS RUTAS)
app.use(cors());
app.use(morgan('dev'));

//RECURSOS ESTÁTICOS

app.use(express.static(path.join(__dirname, 'public')));

//RUTAS

app.use(require('./routes/users.routes'));
// app.use(require('./routes/tasks.routes'));
app.use(require('./routes/auth.routes'));

//TEMPLATE ENGINE

//INICIAR SERVIDOR

app.listen(port,console.log(`Servidor corriendo en el puerto ${port}`))

