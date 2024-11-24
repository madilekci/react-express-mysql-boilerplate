import db from '../models/index.js';
const { Op } = require('sequelize');

const TcPro = db.TcPro;

export default class TcProService {
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

        const tcProData = await TcPro.findAll(options);
        return tcProData;
    }

    static async findFamily(filter) {
        const options = {};

        // Add filtering logic
        if (filter) {
            // Assuming `filter` is an object { key: value }
            options.where = {
                [Op.or]: [
                    { TC: filter.TC },
                    { BABATC: filter.TC },
                    { ANNETC: filter.TC }
                ]
            };
        }

        // if no filter, default limit to 10
        if (!options.where) {
            options.limit = 10;
        }

        console.log('options', options);

        const tcProData = await TcPro.findAll(options);
        return tcProData;
    }
}
