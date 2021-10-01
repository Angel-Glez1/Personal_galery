const { Schema, model } = require('mongoose');
const moment = require('moment');


const PhotoSchema = Schema({

	album: {
		type: Schema.Types.ObjectId,
		ref: 'Album',
		required: [true, 'the Album ID is required']
	},

	user : {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'The user ID is required']
	},

	photo: {
		type: String
	},
	
	name: {
		type: String
	},

	estado: {
		type: Boolean,
		default: true
	},

	created_at: {
		type: Date,
		default: moment().format()
	}
	

});
PhotoSchema.method('toJSON', function () {
	const { __v, estado, _id , ...photo } = this.toObject();
	photo.photo_id = _id;
	return photo;
});


module.exports = model('Photo', PhotoSchema);