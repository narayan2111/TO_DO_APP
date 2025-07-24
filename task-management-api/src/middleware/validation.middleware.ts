import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body
    const { error } = schema.validate(req.body);

    if (error) {
      // If validation fails, send a 400 Bad Request response
      return res.status(400).json({ message: error.details[0].message });
    }

    // If validation passes, move to the next middleware or route handler
    next();
  };