const express = require('express');
const { connectDB } = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 8080;

// Middleware
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: { validatorUrl: null },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Temples API Docs'
}));

// Connect to MongoDB
connectDB().then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Failed to connect to database:', error);
});

// Routes
app.use('/', require('./routes')); // Existing contacts and lesson routes
app.use('/temples', require('./routes/temples')); // Temple routes

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});