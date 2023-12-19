import { Router } from 'express';

import {
  getAllCacheMiddleware,
  getOneCacheMiddleware,
} from '../../middleware/cacheMiddleware.js';
import { getAllFilms, getFilmById } from './filmController.js';

const router = Router();

router.get('/all-films', getAllCacheMiddleware('films'), getAllFilms);
router.get('/:id', getOneCacheMiddleware('singleFilmDoc'), getFilmById);

export default router;
