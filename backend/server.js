const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');

const app = express();
const routes = requireDir('./routes')
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
for(const i in routes)app.use('/',routes[i]);


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
module.exports = app
