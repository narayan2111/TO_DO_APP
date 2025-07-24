import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../models/task.model';

// Use an in-memory array for data storage
let tasks: Task[] = [];

/**
 * Retrieves all tasks with optional filtering and pagination.
 * @param status - Filter tasks by status.
 * @param title - Search tasks by title (case-insensitive).
 * @param page - Page number for pagination.
 * @param limit - Number of tasks per page.
 * @returns An object containing the tasks and total count.
 */
export const getAll = (
  status?: TaskStatus,
  title?: string,
  page = 1,
  limit = 10
) => {
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  if (title) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  return {
    total: filteredTasks.length,
    page,
    limit,
    data: paginatedTasks,
  };
};

/**
 * Finds a task by its ID.
 * @param id - The ID of the task to find.
 * @returns The found task or undefined.
 */
export const getById = (id: string): Task | undefined => {
  return tasks.find((task) => task.id === id);
};

/**
 * Creates a new task.
 * @param data - The data for the new task (title and description).
 * @returns The newly created task.
 */
export const create = (data: { title: string; description: string }): Task => {
  const newTask: Task = {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  return newTask;
};

/**
 * Updates an existing task.
 * @param id - The ID of the task to update.
 * @param data - The data to update the task with.
 * @returns The updated task or null if not found.
 */
export const update = (
  id: string,
  data: Partial<Task>
): Task | null => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return null;
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...data, updatedAt: new Date() };
  return tasks[taskIndex];
};

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 * @returns True if the task was deleted, false otherwise.
 */
export const remove = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < initialLength;
};