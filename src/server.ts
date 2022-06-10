import dotenv from 'dotenv';
import app from './app';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTIONS ......Shutting down.');
  process.exit(1);
});

const port: number = parseInt(process.env.PORT) || 3001;

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

///Handling Unhandled Promise Rejection
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION ......Shutting down.');
  
  server.close(() => {
    process.exit(1);
  });
});
