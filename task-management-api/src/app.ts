import express, { Application, Request, Response } from 'express';
import taskRoutes from './routes/task.routes';
import setupSwagger from './docs/swagger';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/tasks', taskRoutes);

// Setup Swagger Documentation
setupSwagger(app);

// Simple route for the root
app.get('/', (req: Request, res: Response) => {
  res.send('Task Management API is running!');
});

export default app;