const express = require('express');
const { errorHandler } = require('./middlewares/errorMiddleware');
const hospitalRoutes = require('./routes/hospitalRoutes');

const app = express();

app.use(express.json());

app.use('/api/hospitals', hospitalRoutes);

app.use(errorHandler);

module.exports = app;
