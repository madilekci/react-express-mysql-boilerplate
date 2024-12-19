import express from 'express';

import aquaGSMRoutes from './aquaGSM.routes.js';
import tcProRoutes from './tcPro.routes.js';

const router = express.Router();

router.use('/aquaGSM', aquaGSMRoutes);
router.use('/tcPro', tcProRoutes);

export default router;
