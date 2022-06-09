import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import HttpError from '../utils/errorHandler/http-errors';

function validateRepoDetails(req: Request, res: Response, next: NextFunction) { 

  const schema: Joi = Joi.object({
    repositories: Joi.array().min(1).items(Joi.string()).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(
      new HttpError(error.details[0].path.length > 1 ? "repoName must be an array of non empty strings" : error.details[0].message, 400)
    );
  }

  return next();
}

export default validateRepoDetails;
