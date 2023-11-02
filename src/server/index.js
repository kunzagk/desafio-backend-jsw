const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('../routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

const PORT = process.env.PORT ?? 3_000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
