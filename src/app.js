//SERVIDOR EXPRESS
//IMPORTACIONES DE LIBRERÍAS QUE NECESITARÁ EL PROYECTO

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const conectarBD = require('../databases/connection');

require('dotenv').config();
require('ejs');
require('../databases/connection');

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



