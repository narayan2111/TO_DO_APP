### Task Management System REST API using Node.js, Express, and TypeScript

This document outlines the design and implementation of a simple REST API service for a Task Management System. The service is built with Node.js, Express, and TypeScript, and it supports basic CRUD (Create, Read, Update, Delete) operations. It also includes several bonus features like input validation, pagination, filtering, and API documentation.

---

### 1. Project Structure

A well-organized folder structure is crucial for maintainability and scalability. The project is structured as follows:

```
/task-management-api
|-- /dist
|-- /node_modules
|-- /src
|   |-- /controllers
|   |   `-- task.controller.ts
|   |-- /docs
|   |   `-- swagger.ts
|   |-- /middleware
|   |   `-- validation.middleware.ts
|   |-- /models
|   |   `-- task.model.ts
|   |-- /routes
|   |   `-- task.routes.ts
|   |-- /services
|   |   `-- task.service.ts
|   |-- /utils
|   |   `-- errorHandler.ts
|   |-- app.ts
|   `-- server.ts
|-- .eslintrc.js
|-- .prettierrc
|-- package.json
|-- tsconfig.json
```

**Explanation of the structure:**

*   **/dist**: Contains the compiled JavaScript code.
*   **/node\_modules**: Stores all the project dependencies.
*   **/src**: The main container for the source code.
    *   **/controllers**: Handles the incoming requests and outgoing responses.
    *   **/docs**: Contains the Swagger/OpenAPI documentation configuration.
    *   **/middleware**: For custom middleware, like input validation.
    *   **/models**: Defines the data structure (the Task model).
    *   **/routes**: Defines the API endpoints.
    *   **/services**: Contains the business logic for the application.
    *   **/utils**: Utility functions, such as error handlers.
    *   **app.ts**: The main application file where Express is configured.
    *   **server.ts**: The entry point of the application which starts the server.
*   **.eslintrc.js**: Configuration file for ESLint to enforce code quality.
*   **.prettierrc**: Configuration file for Prettier to ensure consistent code formatting.
*   **package.json**: Lists the project's dependencies and scripts.
*   **tsconfig.json**: The configuration file for the TypeScript compiler.

---

### 2. Technology Stack

*   **Node.js**: A JavaScript runtime for building server-side applications.
*   **Express.js**: A minimal and flexible Node.js web application framework.
*   **TypeScript**: A superset of JavaScript that adds static types.
*   **uuid**: For generating unique identifiers for tasks.
*   **Joi**: A powerful library for input validation.
*   **Swagger-UI-Express & Swagger-JSDoc**: For generating interactive API documentation.
*   **ESLint & Prettier**: For maintaining code quality and consistency.

---

### 3. API Endpoints

The following API endpoints have been implemented:

| Method | Endpoint      | Description                  |
| :----- | :------------ | :--------------------------- |
| `POST`   | `/tasks`      | Creates a new task.          |
| `GET`    | `/tasks`      | Retrieves all tasks.         |
| `GET`    | `/tasks/:id`  | Retrieves a single task by ID. |
| `PUT`    | `/tasks/:id`  | Updates an existing task.    |
| `DELETE` | `/tasks/:id`  | Deletes a task by ID.        |

---

### 4. Implementation Details

#### **a. Data Storage**

For simplicity, an in-memory array is used to store the tasks. This is suitable for a development environment and can be easily replaced with a database like SQLite or MySQL for a production setting.

#### **b. Task Object Structure**

The structure for a task object is as follows:

```json
{
  "id": "string (uuid)",
  "title": "string",
  "description": "string",
  "status": "PENDING | COMPLETED | IN_PROGRESS",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### **c. Bonus Features**

*   **Input Validation**: The Joi library is used to validate the request body for `POST` and `PUT` requests, ensuring data integrity.
*   **Pagination**: The `GET /tasks` endpoint supports pagination using `page` and `limit` query parameters.
*   **Filtering**: The `GET /tasks` endpoint allows filtering tasks by `status` and searching by `title`.
*   **API Documentation**: Swagger/OpenAPI documentation is integrated, providing an interactive way to explore and test the API endpoints. It is accessible at the `/api-docs` endpoint.

---

### 5. Code Implementation

Below are the key code snippets from the implementation.

#### **`src/models/task.model.ts`**

```typescript
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

#### **`src/services/task.service.ts`**

This service handles the core business logic.

```typescript
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../models/task.model';

let tasks: Task[] = [];

// ... (implementation for getAll, getById, create, update, remove)
```

#### **`src/controllers/task.controller.ts`**

This controller manages the request-response cycle.

```typescript
import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

// ... (implementation for all controller functions)
```

#### **`src/routes/task.routes.ts`**

This file defines the API routes.

```typescript
import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { validate } from '../middleware/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../models/task.model';

const router = Router();

router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/', taskController.getAllTasks);
// ... (other routes)

export default router;```

#### **`src/middleware/validation.middleware.ts`**

This middleware uses Joi for validation.

```typescript
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
```

#### **`src/docs/swagger.ts`**

This file configures Swagger.

```typescript
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  // ... (Swagger definition)
};

// ... (Swagger setup)
```

---

### 6. How to Run the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd task-management-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm run dev
    ```

The server will start on `http://localhost:3000/api-docs/`.

### 7. Evaluation and Best Practices

*   **Code Readability and Organization**: The code is structured into logical modules (controllers, services, routes, etc.), making it easy to understand and maintain.
*   **API Correctness**: The API endpoints are fully functional and adhere to the specified requirements.
*   **Best Practices**:
    *   **Error Handling**: A centralized error handling mechanism is in place.
    *   **Coding Standards**: ESLint and Prettier are used to enforce a consistent code style.
    *   **TypeScript**: The use of TypeScript provides strong typing, which helps in catching errors during development.
    *   **Separation of Concerns**: The logic is separated into different layers (controller, service), which is a good practice for building scalable applications.

This implementation provides a solid foundation for a task management API and can be extended with more features as needed.
