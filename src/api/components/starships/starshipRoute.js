import { Router } from 'express';

import {
  getAllCacheMiddleware,
  getOneCacheMiddleware,
} from '../../middleware/cacheMiddleware.js';
import { getAllStarships, getStarshipById } from './starshipController.js';

const router = Router();

router.get(
  '/all-starships',
  getAllCacheMiddleware('starships'),
  getAllStarships,
);
router.get('/:id', getOneCacheMiddleware('singleStarshipDoc'), getStarshipById);

export default router;
