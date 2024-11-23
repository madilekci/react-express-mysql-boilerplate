import db from '../models/index.js';

const AquaGSM = db.AquaGSM;

export default class AquaGSMService {
    static async find(sort, filter) {
        const options = {};

        // Add filtering logic
        if (filter) {
            // Assuming `filter` is an object { key: value }
            options.where = filter;
        }

        // Add sorting logic
        if (sort) {
            // Sort should be { field: 'ASC'/'DESC' }
            options.order = [Object.entries(sort)[0]];
        }

        // if no filter, default limit to 10
        if (!options.where) {
            options.limit = 10;
        }

        const aquaGSMs = await AquaGSM.findAll(options);
        return aquaGSMs;
    }
}
