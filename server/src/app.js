const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorMiddleware');
const hospitalRoutes = require('./routes/hospitalRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/hospitals', hospitalRoutes);
app.use('/api/emergency', emergencyRoutes);

app.use(errorHandler);

module.exports = app;
