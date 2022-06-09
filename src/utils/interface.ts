import { Request, Response, NextFunction } from 'express';
import HttpError from './errorHandler/http-errors';
import { Octokit } from '@octokit/rest';

export interface RequestInterface extends Request {
  octokit?: Octokit;
  requestTime?: string;
  repositories?: string[];
}

export interface ResponseInterface {
  repoName?: string;
  repoDescription?: string;
  noOfStars?: number;
}

export interface RepoPathInterface {
  ownerName: string;
  repoName: string;
}