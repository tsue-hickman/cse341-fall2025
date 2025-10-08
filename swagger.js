const swaggerAutogen = require('swagger-autogen')(); 

const doc = {
    info: {
        title: 'Temples API',
        descripton: 'API for managing temple data in the CSE 341 course',
        version: '1.0.0'
    },
    host: 'localhost:8080' //my app's port
    schemes: ['http'], //this is for Render production
    components: {
        schemas: {
            Temple:{ 
                type: 'object',
                properties: {
                    name: { type:'string', example: 'Salt Lake Temple' },
                    location: { type: 'string', example: 'Salt Lake City, Utah' },
                    dedicated: { type: 'string', enum: ['Operating', 'Under Construction', 'Announced'], example: 'Operating' }
                },
                required: ['name', 'location']
            }
        }
    }
};


const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './routes/temples.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON generated! Rum `npm start` to see the UI at http://localhost:8080/api-docs');
});