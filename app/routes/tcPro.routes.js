import express from 'express';

import TcProService from '../services/tcPro.service.js';
import convertTurkishUppercase from '../common/convert-turkish-uppercase.js';
import handleError from '../middleware/handle-error.js';

const router = express.Router();

// get tcpro items with filtering and sorting
router.post('/personal', async(req, res) => {
    try {
        const tcProData = await TcProService.find(convertTurkishUppercase(req.body.filter));
        res.send(tcProData);
    }
    catch (error) {
        handleError(error, req, res);
    }
});

// TODO: get whole family of a tcPro item using BABATC, ANNETC, etc.
// Add phone numbers and relations to the response
router.post('/family', async(req, res) => {
    try {
        const tcProData = await TcProService.findFamily(req.body.tc);
        res.send(tcProData);
    }
    catch (error) {
        handleError(error, req, res);
    }
});

export default router;
