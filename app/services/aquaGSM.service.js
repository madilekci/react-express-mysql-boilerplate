import db from '../models/index.js';

const AquaGSM = db.AquaGSM;

export default class AquaGSMService {
    static async find(filter) {
        const options = {};

        // Add filtering logic
        if (filter) {
            // Assuming `filter` is an object { key: value }
            options.where = { ...filter };
        }

        // if no filter, default limit to 10
        if (!options.where) {
            options.limit = 10;
        }

        console.log('options', options);
        
        const aquaGSMs = await AquaGSM.findAll(options);
        return aquaGSMs;
    }
}
