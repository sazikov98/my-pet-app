require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
app.use(express.json());

const { logger } = require('./middleware.js');
app.use(logger);

const endpoints = require('./endpoints.js');
app.use("/pet", endpoints);

const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fileContent = fs.readFileSync('./openapi.yaml', 'utf8');
const openapiSpec = yaml.load(fileContent);
app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpec));


app.listen(port, () => {
    console.log(`Сервер запущен на http://${host}:${port}`);
});


app.get('/', (req, res) => {
    res.send('Привет, это ваше первое Express-приложение!');
});