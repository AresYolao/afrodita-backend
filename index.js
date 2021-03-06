const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Configurar CORS

app.use(cors());

//Lectura y parseo del body
app.use(express.json());


//Base de Datos
dbConnection();

//Directorio público
app.use(express.static('public'));

// console.log(process.env);

//8wZk4OdBsMJiF1ZZ
//afrodita


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});