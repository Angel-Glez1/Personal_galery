const { response } = require('express');


const validate_is_admin =  (req, res = response, next ) => {

	if(!req.user){
		return res.status(500).json({ msg:  'You want to verify the role, without validating the token first.'});
	}

	const { rol } = req.user;

	if(rol !== 'ADMIN_ROL'){
		return res.status(401).json({ msg: 'You do not have the necessary permits.' });
	}

	next();
}


const haveRole = ( ...roles ) => {
	return ( req, res = response, next ) => {

		if (!req.user) {
			return res.status(500).json({ msg: 'You want to verify the role, without validating the token first.' });
		}

		if(!roles.includes(req.user.rol)){
			return res.status(401).json({ msg: 'You do not have the necessary permits.' });
		}

		next();
	}
}


module.exports = {
	validate_is_admin,
	haveRole
}
