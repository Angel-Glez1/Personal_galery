const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const moment = require('moment');
const { generarToken } = require('../helpers');
const { User } = require('../models');



const login = async (req = request, res = response) => {

	const { password, email } = req.body;

	try {

		const user = await User.findOne({ email });

		// Does the user exits?
		if (!user) {
			return res.status(400).json({ ok: false, msg: 'Email does not exist' });
		}

		// Is the user banned?
		if (!user.estado) {
			return res.status(400).json({ ok: false, msg: 'User does not exist' });
		}

		// verify passwords
		if (!bcryptjs.compareSync(password, user.password)) {
			return res.status(400).json({ ok: false, mgs: 'Credentials do not match' });
		}

		// Generate token
		const token = await generarToken(user._id);

		// Response
		return res.status(200).json({ ok: true, token, user });

	} catch (e) {
		console.log(e);
		return res.status(500).json({ ok: false, msg: 'Speak with Admin' });
	}
}

//TODO:: Create new user in database
const signUp = async (req, res = response) => {

	const { name, password, email } = req.body;

	const user = new User({ name, password, email });

	// Hacer el hash de las contraseñas
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);


	try {

		// save new user
		await user.save();

		// Generate token
		const token = await generarToken(user._id);

		
		return res.json({ ok: true, token, user });

	} catch (e) {
		console.log(e);
		return res.status(500).json({ ok: false, msg: 'Speak with Admin' });
	}

}


const renew_token = async (req, res = response) => {

	const { user } = req;

	// Renew new token
	const token = await generarToken(user._id);

	res.json({ ok: true, token, user });


}
module.exports = {
	login,
	signUp,
	renew_token
}