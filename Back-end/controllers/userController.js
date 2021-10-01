const { response, request } = require('express');
const bcrytpjs = require('bcryptjs');
const { User } = require('../models');


const getUsers = async (req = request, res = response) => {

	const { limit = 10, offset = 0 } = req.query;
	const querys = [
		User.countDocuments({ estado: true }),
		User.find({ estado: true })
			.skip(Number(offset))
			.limit(Number(limit))
	];

	const [count, result] = await Promise.all(querys);
	return res.status(200).json({ ok: true, count, result });

}


const getUserById = async (req = request, res = response) => {

	const { id } = req.params;
	const user = await User.findById(id);
	return res.status(200).json({ ok: true, user });
}


const updateUser = async (req = request, res = response) => {

	const { id } = req.params;

	
	if (req.user._id.toString() !== id) {
		return res.status(400).json({ ok: false, msg: 'You cannot perform this action.' });
	}

	const { _id, email, password, estado, created_at, ...dataForUpdate } = req.body;

	if (password) {
		const salt = bcrytpjs.genSaltSync();
		dataForUpdate.password = bcrytpjs.hashSync(password, salt);
	}

	//* Updated User
	const user = await User.findByIdAndUpdate(id, dataForUpdate, { new: true });
	res.status(200).json({ ok: true,  user });

}


// TODO:: ESTA ACCION SOLO LA PUEDEN HACER LOS ADMIN...
const deleteUser = async (req = request, res = response, next) => {

	const { id } = req.params;
	const userDelete = await User.findByIdAndUpdate(id, { estado: false }, { new: true });
	res.json({ userDelete});
	next();

}




module.exports = {
	getUsers,
	getUserById,
	updateUser,
	deleteUser


}






