const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const validate_token = async (req = request, res = response, next) => {


	const token = req.header('x-token');

	if (!token) {
		return res.status(400).json({ ok: false, msg: 'Not exist token' });
	}



	try {

		const { uid } = jwt.verify(token, process.env.SECRET_KEY);
		const _user = await User.findById(uid);
	
		if (!_user) {
			return res.status(401).json({ ok: false, msg: 'Invalid token - user deleted' });
		}

		if (!_user.estado) {
			return res.status(401).json({ ok: false, msg: 'Invalid Token - banned user' });
		}

		req.user = _user;
	
	
	} catch (e) {

		console.log(e);
		return res.status(400).json({ ok: false, mgs: 'token invalid' });
		
	}

	next();

}


module.exports = {
	validate_token
}