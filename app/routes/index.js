import express from 'express';

import aquaGSMRoutes from './aquaGSM.routes.js';

const router = express.Router();

router.use('/aquaGSM', aquaGSMRoutes);

export default router;
