import { Router } from 'express';

import characterRouter from './characters/characterRoute.js';
import filmRouter from './films/filmRoute.js';
import planetRouter from './planets/planetRoute.js';
import speciesRouter from './species/speciesRoute.js';
import starshipRouter from './starships/starshipRoute.js';
import vehicleRouter from './vehicle/vehicleRoute.js';

const router = Router();

router.use('/people', characterRouter);
router.use('/film', filmRouter);
router.use('/planet', planetRouter);
router.use('/species', speciesRouter);
router.use('/starship', starshipRouter);
router.use('/vehicle', vehicleRouter);

export default router;
