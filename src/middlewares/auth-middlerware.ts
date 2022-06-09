import { Request, Response, NextFunction } from 'express';
import { Octokit } from '@octokit/rest';
import HttpError from '../utils/errorHandler/http-errors';

//protecting route using a middleware function
interface requestInterface extends Request {
  octokit?: Octokit;
}
export const protect = async (
  req: requestInterface,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.method === 'OPTIONS') {
      return next();
    }
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new HttpError(
          'You authorized to access this route! Please provide your token',
          401
        )
      );
    }

    //Grant access to protected route
    const octokit = new Octokit({
      auth: token,
    });

    req.octokit = octokit;

    next();
  } catch (error) {
    // console.log(error);
    return next(new HttpError('Authentication failed!', 403));
  }
};

