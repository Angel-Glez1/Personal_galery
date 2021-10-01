const jwt = require('jsonwebtoken');

const generarToken = ( uid ) => {

	return new Promise((res, rej) => {

		const payload = { uid };

		jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, token) => {

			if (err) {
				rej('No se pude generar el Token');
			}

			res(token)
		});
	});
}


module.exports = {
	generarToken
}