const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');


const searchUser = async (term, res = response) => {

	const isMongoID = ObjectId.isValid(term);

	//TODO:: Search User By ID
	if (isMongoID) {
		const user = await User.findById(termino);
		return res.json({
			ok: true,
			results: (user) ? [user] : []
		});
	}

	//TODO:: Search user by name or email
	const regex = new RegExp(term, 'i'); //Hace que la busqueda no sea caseSinsible
	const usuarios = await User.find({
		$or: [{ name: regex }, {email: regex }],
		$and: [{ estado: true }]
	});


	res.json({ ok: true, results: usuarios });
}

module.exports = {
	searchUser
}