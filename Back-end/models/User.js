const { Schema, model } = require('mongoose');
const moment = require('moment');


const UserSchema = Schema({

	name: {
		type: String,
		required: [true, 'El nombre es obligatorio']
	},

	email: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true
	},

	password: {
		type: String,
		required: [true, 'la contraseña es obligatorio']
	},

	rol: {
		type: String,
		required: true,
		default: 'USER_ROL',
	},

	estado: {
		type: Boolean,
		default: true
	},

	created_at : {
		type: Date,
		default: moment().format()
	}

});

UserSchema.method('toJSON', function () {
	const { __v, password, _id, estado, email, created_at,...user } = this.toObject();
	user.uid = _id;
	return user;
});


module.exports = model('User', UserSchema);