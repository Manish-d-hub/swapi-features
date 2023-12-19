import { Router } from 'express';

import {
  getAllCacheMiddleware,
  getOneCacheMiddleware,
} from '../../middleware/cacheMiddleware.js';
import { getAllPlanets, getPlanetById } from './planetController.js';

const router = Router();

router.get('/all-planets', getAllCacheMiddleware('planets'), getAllPlanets);
router.get('/:id', getOneCacheMiddleware('singlePlanetDoc'), getPlanetById);

export default router;
