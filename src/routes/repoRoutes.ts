import express from 'express';
import {
  getRepoDetails,
} from '../controllers/repoController';
import { protect } from '../middlewares/auth-middlerware';
import repoDetailValidator from '../middlewares/repoDetailsValidator';

const router = express.Router();

router.post('/github/repo_info', repoDetailValidator, protect, getRepoDetails);
// router.get('/github/repo_info',protect, getRepoDetails);

export default router;
