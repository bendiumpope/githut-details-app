import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.GITHUB_ACCESS_TOKEN;

describe('Get Repo details', () => {
  test('should return 401 status when accessing unauthorized routes', async () => {
    const res = await request(app)
      .post('/api/v1/github/repo_info')
      .send({
        repositories: [
          'bendiumpope/sabi-tour',
          'nexthandler/next-handle-backend',
          'bendiumpope/scratchcard-application-probation',
        ],
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toEqual({
      message: 'You authorized to access this route! Please provide your token',
    });
  });

  test('should return arrays of repository data', async () => {
    const res = await request(app)
      .post('/api/v1/github/repo_info')
      .set('Authorization', `Bearer ${token}`)
      .send({
        repositories: [
          'bendiumpope/sabi-tour',
          'bendiumpope/scratchcard-application-probation',
        ],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toStrictEqual([
        {
          repoName: 'sabi-tour',
          repoDescription:
            'A tour application which enable users view tours available, check out reviews on the tour and also make reservations and payment ',
          noOfStars: 1,
        },
        {
          repoName: 'scratchcard-application-probation',
          repoDescription:
            'A project on scratchcard pin generation verification and validation',
          noOfStars: 0,
        },
      ],
    );
  });

  test('should return 404 status if any of the repository does not exist', async () => {
      const res = await request(app)
        .post('/api/v1/github/repo_info')
        .set('Authorization', `Bearer ${token}`)
        .send({
          repositories: [
            'bendiumpope/sabi-tour',
            'bendiumpope/scratchcard-application-probation',
            'bendiumpope/next-handle-backend',
          ],
        });
    expect(res.statusCode).toEqual(404);
  });

  test('should return 400 status for bad input format', async () => {
    const res = await request(app)
      .post('/api/v1/github/repo_info')
      .set('Authorization', `Bearer ${token}`)
      .send({
        repositories: [
          'bendiumpope',
          'bendiumpope/scratchcard-application-probation',
          'bendiumpope/next-handle-backend',
        ],
      });
    expect(res.statusCode).toEqual(400);
  });
});
