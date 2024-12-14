import db from '../models/index.js'
import { Op } from 'sequelize'

import AquaGSMService from './aquaGSM.service.js'

const TcPro = db.TcPro

export default class TcProService {
	static relationKeys = {
		self: 'Kendisi',
		mother: 'Anne',
		father: 'Baba',
		sibling: 'Kardeş',
		child: 'Çocuk',
		grandFather: 'Dede',
		grandMother: 'Nene',
		uncleAunt: 'Amca/Dayı - Hala/Teyze',
		cousin: 'Kuzen',
		grandChild: 'Torun'
	}

	static async find(filter) {
		const options = {}

		// Add filtering logic
		if (filter) {
			// Assuming `filter` is an object { key: value }
			options.where = { ...filter }
		}

		// if no filter, default limit to 10
		options.limit = options.where ? 100 : 10
		console.log('options', options)

		const tcProData = await TcPro.findAll(options)
		console.log(`${tcProData.length} records found`)

		return tcProData
	}

	static async findFamily(initialTC, advancedSearch = false) {
		const findExtendedFamily = async (person) => {
			const relationships = []

			const addRelationToArray = async (people, relation) => {
				if (!people || people.length === 0) {
					return
				}
				people.forEach((person) => {
					relationships.push({ ...person, relation })
				})
			}
			const findChildren = async (person) => {
				const children = await TcPro.findAll({
					where: { [Op.or]: [{ BABATC: person.TC }, { ANNETC: person.TC }] }
				})
				addRelationToArray(children, this.relationKeys.child)
				return children
			}
			const findGrandChildren = async (children) => {
				const grandchildren = []
				for await (const child of children) {
					const _grandchildren = await TcPro.findAll({
						where: { [Op.or]: [{ BABATC: child.TC }, { ANNETC: child.TC }] }
					})
					if (_grandchildren?.length > 0) {
						grandchildren.push(..._grandchildren)
					}
				}

				addRelationToArray(grandchildren, this.relationKeys.grandChild)

				return grandchildren
			}
			const findSiblings = async (person) => {
				const { BABATC, ANNETC, TC } = person

				const siblings = await TcPro.findAll({
					where: {
						[Op.or]: [{ BABATC }, { ANNETC }],
						// Exclude the current person
						TC: { [Op.ne]: TC }
					}
				})
				addRelationToArray(siblings, this.relationKeys.sibling)

				return siblings
			}
			const findParents = async (person) => {
				const { BABATC, ANNETC } = person

				const father = await TcPro.findOne({ where: { TC: BABATC } })
				const mother = await TcPro.findOne({ where: { TC: ANNETC } })
				const parents = [father, mother].filter(Boolean)

				addRelationToArray([father], this.relationKeys.father)
				addRelationToArray([mother], this.relationKeys.mother)

				return parents
			}
			const findGrandParents = async (parents) => {
				const grandParents = []
				for await (const parent of parents) {
					if (parent.BABATC) {
						const grandFather = await TcPro.findOne({ where: { TC: parent.BABATC } })
						addRelationToArray([grandFather], this.relationKeys.grandFather)
						grandParents.push(grandFather)
					}
					if (parent.ANNETC) {
						const grandMother = await TcPro.findOne({ where: { TC: parent.ANNETC } })
						addRelationToArray([grandMother], this.relationKeys.grandMother)
						grandParents.push(grandMother)
					}
				}

				return grandParents
			}
			const findUnclesAunts = async (parents) => {
				const unclesAunts = []
				for await (const parent of parents) {
					const _unclesAunts = await TcPro.findAll({
						where: {
							[Op.or]: [{ BABATC: parent.BABATC }, { ANNETC: parent.ANNETC }],
							// Exclude the parent themselves
							TC: { [Op.ne]: parent.TC }
						}
					})
					if (_unclesAunts?.length > 0) {
						unclesAunts.push(..._unclesAunts)
					}
				}

				addRelationToArray(unclesAunts, this.relationKeys.uncleAunt)

				return unclesAunts
			}
			const findCousins = async (unclesAunts) => {
				const cousins = []
				for await (const uncleAunt of unclesAunts) {
					const _cousins = await TcPro.findAll({
						where: {
							[Op.or]: [{ BABATC: uncleAunt.TC }, { ANNETC: uncleAunt.TC }]
						}
					})
					if (_cousins?.length > 0) {
						cousins.push(..._cousins)
					}
				}

				addRelationToArray(cousins, this.relationKeys.cousin)

				return cousins
			}

			console.log(`Starting search for extended family members of TC: ${initialTC}`)

			// Find parents, children, siblings
			const parents = await findParents(person)
			const children = await findChildren(person)
			await findSiblings(person)

			if (advancedSearch) {
				// Find uncles/aunts, cousins
				const unclesAunts = await findUnclesAunts(parents)
				await findCousins(unclesAunts)

				// Find grandparents, grandchilds
				await findGrandParents(parents)
				await findGrandChildren(children)
			}

			return relationships
		}

		// Find the person with the initialTC
		const person = await TcPro.findOne({ where: { TC: initialTC } })
		if (!person) {
			throw new Error(`No person found with TC: ${initialTC}`)
		}

		// Find the family members of the person such as father, mother, grandparents etc.
		const familyMembers = await findExtendedFamily(person)
		// Make family members array unique by TC
		const uniqueFamilyMembers = [{ ...person, relation: this.relationKeys.self }, ...familyMembers].reduce((acc, current) => {
			if (!acc.some((item) => item.TC === current.dataValues.TC)) {
				acc.push({ ...current.dataValues, relation: current.relation })
			}
			return acc
		}, [])

		// Add gsm
		for (const person of uniqueFamilyMembers) {
			// Add other GSM numbers for each family member if exists in aquagsm
			const otherGSM = await AquaGSMService.find({ TC: person.TC })
			person.otherGSM = otherGSM.map((g) => g.GSM).filter((g) => g !== person.GSM)

			// if person has no GSM and some otherGSM, pick first one from otherGSM as GSM
			if (!person.GSM && person.otherGSM.length > 0) {
				person.GSM = person.otherGSM[0]
				person.otherGSM.shift()
			}
		}

		console.log(`Total extended family members found: ${familyMembers.length} for TC: ${initialTC}`)
		return uniqueFamilyMembers
	}
}
