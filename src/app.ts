import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import limiter from './middlewares/rateLimiter'

import repoRoutes from './routes/repoRoutes';
import httpError from './utils/errorHandler/http-errors';
import { HttpError } from 'http-errors';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(helmet());


app.use('/api/v1', limiter);

app.use(express.json({ limit: '10kb' }));
app.use((req: any, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(cors());

app.use('/api/v1', repoRoutes);

app.all('*', (req: Request) => {
  const error = new httpError(
    `Cant find ${req.originalUrl} on this server!`,
    404
  );

  throw error;
});


app.use((error: HttpError, req: Request, res: any, next: NextFunction) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || 'An unknown error occured',
  });
});

export default app;
