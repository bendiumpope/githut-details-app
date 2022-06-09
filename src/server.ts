import dotenv from 'dotenv';
import app from './app';

dotenv.config();
///Handling Unhandled Uncaught Exception (synchronous error)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTIONS ......Shutting down.');
  // console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

const port: number = parseInt(process.env.PORT) || 3001;

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

///Handling Unhandled Promise Rejection
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION ......Shutting down.');
  console.log(err);
  console.log(err.name, err.message);
  // console.log(err.stack)

  server.close(() => {
    process.exit(1);
  });
});
