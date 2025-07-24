import Joi from 'joi';

// Enum for task statuses
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

// Interface for a Task object
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Joi schema for creating a task
export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(255).required(),
});

// Joi schema for updating a task
export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50),
  description: Joi.string().min(3).max(255),
  status: Joi.string().valid(...Object.values(TaskStatus)),
}).min(1); // At least one field must be provided for an update