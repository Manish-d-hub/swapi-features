import { Router } from 'express';

import {
  getAllCacheMiddleware,
  getOneCacheMiddleware,
} from '../../middleware/cacheMiddleware.js';
import { getAllVehicles, getVehicleById } from './vehicleController.js';

const router = Router();

router.get('/all-vehicles', getAllCacheMiddleware('vehicles'), getAllVehicles);

router.get('/:id', getOneCacheMiddleware('singleVehicleDoc'), getVehicleById);

export default router;
