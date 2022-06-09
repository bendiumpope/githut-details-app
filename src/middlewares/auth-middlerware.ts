import { Request, Response, NextFunction } from 'express';
import { Octokit } from '@octokit/rest';
import httpError from '../utils/errorHandler/http-errors';
import { RequestInterface } from '../utils/interface'
import HttpError from '../utils/errorHandler/http-errors';

//protecting route using a middleware function
export const protect = async (
  req: RequestInterface,
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
        new httpError(
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
    return next(new httpError('Authentication failed!', 403));
  }
};

