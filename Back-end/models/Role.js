const { Schema, model } = require('mongoose');

const rolSchema = Schema({

	rol: {
		type: String,
		required: [true, 'The rol required']
	}

});




module.exports = model('Role', rolSchema);