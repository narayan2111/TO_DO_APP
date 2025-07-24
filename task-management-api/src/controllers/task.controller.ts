import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { TaskStatus } from '../models/task.model';
import { sendErrorResponse } from '../utils/errorHandler'; // <-- IMPORT THE UTILITY

export const createTask = (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newTask = taskService.create({ title, description });
  res.status(201).json(newTask);
};

export const getAllTasks = (req: Request, res: Response) => {
  const { status, title, page, limit } = req.query;
  const tasks = taskService.getAll(
    status as TaskStatus,
    title as string,
    page ? parseInt(page as string) : 1,
    limit ? parseInt(limit as string) : 10
  );
  res.status(200).json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const task = taskService.getById(id);
  if (!task) {
    // USE THE UTILITY
    return sendErrorResponse(res, 404, 'Task not found');
  }
  res.status(200).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTask = taskService.update(id, req.body);
  if (!updatedTask) {
    // USE THE UTILITY
    return sendErrorResponse(res, 404, 'Task not found');
  }
  res.status(200).json(updatedTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = taskService.remove(id);
  if (!success) {
    // USE THE UTILITY
    return sendErrorResponse(res, 404, 'Task not found');
  }
  res.status(204).send(); // No Content
};