import { Response } from 'express';

/**
 * Sends a standardized JSON error response.
 * @param res - The Express response object.
 * @param statusCode - The HTTP status code.
 * @param message - The error message.
 */
export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
};