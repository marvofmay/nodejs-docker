const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for my Express App',
        },
        servers: [{
            url: '/api/v1'
        }, {
            //url: '/api/v2',
        }],
    },
    apis: [
        './src/controllers/api/v1/category/*.js',
        './src/controllers/api/v1/manufacturer/*.js',
        './src/controllers/api/v1/product/*.js',
        //'./src/controllers/api/v2/category/*.js',
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
