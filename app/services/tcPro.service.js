import db from '../models/index.js';
import { Op } from 'sequelize';

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
        options.limit = options.where ? 100 : 10;
        console.log('options', options);

        const tcProData = await TcPro.findAll(options);
        console.log(`${tcProData.length} records found`);

        return tcProData;
    }

    static async findFamily(initialTC) {
        const findExtendedFamily = async person => {
            const relationships = [];

            const addRelationToArray = async(people, relation) => {
                if (!people || people.length === 0) {
                    return;
                }
                people.forEach(person => {
                    relationships.push({ ...person, relation });
                });
            };
            const findChildren = async person => {
                const children = await TcPro.findAll({
                    where: { [Op.or]: [{ BABATC: person.TC }, { ANNETC: person.TC }] }
                });
                addRelationToArray(children, 'Child');
                return children;
            };
            const findGrandChildren = async children => {
                const grandchildren = [];
                for await (const child of children) {
                    const _grandchildren = await TcPro.findAll({
                        where: { [Op.or]: [{ BABATC: child.TC }, { ANNETC: child.TC }] }
                    });
                    if (_grandchildren?.length > 0) {
                        grandchildren.push(..._grandchildren);
                    }
                }

                addRelationToArray(grandchildren, 'Grandchild');

                return grandchildren;
            };
            const findSiblings = async person => {
                const { BABATC, ANNETC, TC } = person;

                const siblings = await TcPro.findAll({
                    where: {
                        [Op.or]: [
                            { BABATC },
                            { ANNETC }
                        ],
                        // Exclude the current person
                        TC: { [Op.ne]: TC }
                    }
                });
                addRelationToArray(siblings, 'Sibling');

                return siblings;
            };
            const findParents = async person => {
                const { BABATC, ANNETC } = person;

                const father = await TcPro.findOne({ where: { TC: BABATC } });
                const mother = await TcPro.findOne({ where: { TC: ANNETC } });
                const parents = [father, mother].filter(Boolean);

                addRelationToArray([father], 'Father');
                addRelationToArray([mother], 'Mother');

                return parents;
            };
            const findGrandParents = async parents => {
                const grandParents = [];
                for await (const parent of parents) {
                    if (parent.BABATC) {
                        const grandFather = await TcPro.findOne({ where: { TC: parent.BABATC } });
                        addRelationToArray([grandFather], 'Grandfather');
                        grandParents.push(grandFather);
                    }
                    if (parent.ANNETC) {
                        const grandMother = await TcPro.findOne({ where: { TC: parent.ANNETC } });
                        addRelationToArray([grandMother], 'Grandmother');
                        grandParents.push(grandMother);
                    }
                }

                return grandParents;
            };
            const findUnclesAunts = async parents => {
                const unclesAunts = [];
                for await (const parent of parents) {
                    const _unclesAunts = await TcPro.findAll({
                        where: {
                            [Op.or]: [
                                { BABATC: parent.BABATC },
                                { ANNETC: parent.ANNETC }
                            ],
                            // Exclude the parent themselves
                            TC: { [Op.ne]: parent.TC }
                        }
                    });
                    if (_unclesAunts?.length > 0) {
                        unclesAunts.push(..._unclesAunts);
                    }
                }

                addRelationToArray(unclesAunts, 'Uncle/Aunt');

                return unclesAunts;
            };
            const findCousins = async unclesAunts => {
                const cousins = [];
                for await (const uncleAunt of unclesAunts) {
                    const _cousins = await TcPro.findAll({
                        where: {
                            [Op.or]: [
                                { BABATC: uncleAunt.TC },
                                { ANNETC: uncleAunt.TC }
                            ]
                        }
                    });
                    if (_cousins?.length > 0) {
                        cousins.push(..._cousins);
                    }
                }

                addRelationToArray(cousins, 'Cousin');

                return cousins;
            };

            console.log(`Starting search for extended family members of TC: ${initialTC}`);
            // Find children, grandChildren
            const children = await findChildren(person);
            if (children?.length > 0) {
                await findGrandChildren(children);
            }
            await findSiblings(person);

            // Find parents, grandparents, uncles/aunts, and cousins
            if (person.BABATC || person.ANNETC) {
                const parents = await findParents(person);
                if (parents?.length > 0) {
                    await findGrandParents(parents);

                    const unclesAunts = await findUnclesAunts(parents);
                    if (unclesAunts?.length > 0) {
                        await findCousins(unclesAunts);
                    }
                }
            }

            return relationships;
        };

        // Find the person with the initialTC
        const person = await TcPro.findOne({ where: { TC: initialTC } });
        if (!person) {
            throw new Error(`No person found with TC: ${initialTC}`);
        }

        // Find the family members of the person such as father, mother, grandparents etc.
        const familyMembers = await findExtendedFamily(person);
        const uniqueFamilyMembers = familyMembers.reduce((acc, current) => {
            if (!acc.some(item => item.TC === current.TC)) {
                acc.push(current);
            }
            return acc;
        }, []);

        console.log(`Total extended family members found: ${familyMembers.length} for TC: ${initialTC}`);
        return [person, ...uniqueFamilyMembers];
    }
}
