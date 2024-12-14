const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for the project',
  },
  servers: [
    {
      url: 'http://113.198.66.75:17131/api',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // 라우트 파일에서 Swagger 주석을 읽어옵니다.
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
