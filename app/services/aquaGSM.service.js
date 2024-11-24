import { Op } from 'sequelize';

import db from '../models/index.js';
import TcProService from './tcPro.service.js';

const AquaGSM = db.AquaGSM;

export default class AquaGSMService {
    static async find(filter) {
        const options = {};

        // Add filtering logic
        if (filter) {
            // Assuming `filter` is an object { key: value }, for example, { TC: '19055500022' }
            options.where = { ...filter };
        }

        // if no filter, default limit to 10
        if (!options.where) {
            options.limit = 10;
        }

        console.log('options', options);

        const aquaGSMs = await AquaGSM.findAll(options);

        const enrichedResults = await Promise.all(
            aquaGSMs.map(async record => {
                const tcPro = await TcProService.find({
                    [Op.or]: [
                        { TC: record.TC },
                        { GSM: record.GSM },
                    ],
                });

                return {
                    ...record.get(),
                    AD: tcPro?.AD || null,
                    SOYAD: tcPro?.SOYAD || null,
                };
            })
        );

        return enrichedResults;
    }
}
