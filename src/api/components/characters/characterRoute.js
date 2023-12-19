import { Router } from 'express';
import { getAllCharacters, getCharacterById } from './characterController.js';
import {
  getAllCacheMiddleware,
  getOneCacheMiddleware,
} from '../../middleware/cacheMiddleware.js';

const router = Router();
router.get('/characters', getAllCacheMiddleware('people'), getAllCharacters);
router.get(
  '/characters/:id',
  getOneCacheMiddleware('singlePeopleDoc'),
  getCharacterById,
);

export default router;
