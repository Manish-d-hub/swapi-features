import { Router } from 'express';

import {
  getAllCacheMiddleware,
  getOneCacheMiddleware,
} from '../../middleware/cacheMiddleware.js';
import { getAllSpecies, getSpecieById } from './speciesController.js';

const router = Router();

router.get('/all-species', getAllCacheMiddleware('species'), getAllSpecies);
router.get('/:id', getOneCacheMiddleware('singleSpecieDoc'), getSpecieById);

export default router;
