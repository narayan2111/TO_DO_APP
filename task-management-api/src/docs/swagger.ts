import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express'; // Corrected import

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description:
        'A simple REST API for managing tasks, built with Node.js, Express, and TypeScript.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Tasks',
        description: 'API for tasks management',
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

// Corrected the type from Express to Application
const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;