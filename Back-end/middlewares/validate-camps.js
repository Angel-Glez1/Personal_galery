const { validationResult } = require('express-validator');


const validate_camps = (req, res, next) => {

	// Obtener arrays de errores
	const err = validationResult(req);

	
	// Validar si el array tiene algo.
	if (!err.isEmpty()) {
		return res.status(400).json({ ok: false , msg : err.errors[0].msg });
	}


	// Si no hay errores llama al controller. 
	next();
}





//**...  EXPORTACION DE MIDDLEWARES   ....**//
module.exports = {
	validate_camps
}