const { Role } = require('../models');


const createRol = async (req, res) => {

	try {
		
		const rol = new Role({ rol: req.body.rol.toUpperCase() });
		rol.save();
		return res.status(201).json({
			ok: true,
			rol
		});


	} catch (e) {
		console.log(e);
		return res.status(500).json({ msg: 'Speak with Admin' });
	}

}


module.exports = {
	createRol
}

