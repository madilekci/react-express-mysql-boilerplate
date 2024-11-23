import express from 'express';

import AquaGSMService from '../services/aquaGSM.service.js';

import handleError from '../middleware/handle-error.js';

const router = express.Router();

// get aquaGSM items with filtering and sorting
router.post('/', async(req, res) => {
    try {
        const aquaGSMData = await AquaGSMService.find(req.body.filter);
        res.send(aquaGSMData);
    }
    catch (error) {
        handleError(error, req, res);
    }
});

export default router;
