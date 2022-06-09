import { Request, Response, NextFunction } from 'express';
import { Octokit } from '@octokit/rest';
import HttpError from '../utils/errorHandler/http-errors';
import {
  getSingleRepoDetails,
  structureResponse,
} from '../utils/helperHandler/getRepoDetails';

interface requestInterface extends Request {
  octokit?: Octokit;
}

interface responseInterface {
  repoName?: string;
  repoDescription?: string;
  noOfStars?: number;
}

export const getRepoDetails = async (
  req: requestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const { octokit } = req;

    const { repositories } = req.body;

    const repoDetails = await Promise.all(
      repositories.map(async (repo) => {
        const data = await getSingleRepoDetails(octokit, repo);
        return data;
      })
    );

    const data: Array<responseInterface> = await structureResponse(
      repoDetails,
      repositories
    );

    // if (data.length < 1) {
    //   return res.status(404).json({
    //     message: `The Repository ${repoName} is not found on ${owner}`,
    //   });
    // }

    return res.status(200).json({
      message: 'success',
      data: data,
    });

  } catch (error) {
    const pathname = new URL(error.response.url).searchParams;

    if (error.status === 404) {
      return next(
        new HttpError(
          `${pathname.get("owner")} does not exist on ${
            pathname.get("repo")
          }`,
          404
        )
      );
    }
      return next(
        new HttpError(
          'An error occured, getting repo details failed......',
          500
        )
      );
}
};
