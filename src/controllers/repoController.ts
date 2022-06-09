import { Request, Response, NextFunction } from 'express';
import { Octokit } from '@octokit/rest';
import HttpError from '../utils/errorHandler/http-errors';
import { RequestInterface } from 'src/utils/interface';
import { ResponseInterface } from 'src/utils/interface';

import {
  getSingleRepoDetails,
  structureResponse,
} from '../utils/helperHandler/getRepoDetails';




export const getRepoDetails = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const { octokit } = req;

    const { repositories }: RequestInterface  = req.body;

    const repoDetails = await Promise.all(
      repositories.map(async (repo) => {
        const data = await getSingleRepoDetails(octokit, repo);
        return data;
      })
    );

    const data: Array<ResponseInterface> = await structureResponse(
      repoDetails,
      repositories
    );

    return res.status(200).json({
      message: 'success',
      data: data,
    });
  } catch (error) {
    if (error?.status === 404) {
      const pathname: URLSearchParams = new URL(error.response.url).searchParams;
      return next(
        new HttpError(
          `${pathname.get('owner')} does not exist on ${pathname.get('repo')}`,
          404
        )
      );
    }
    return next(
      new HttpError('An error occured, getting repo details failed......', 500)
    );
  }
};
