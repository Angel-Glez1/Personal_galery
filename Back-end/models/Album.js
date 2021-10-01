const { Schema, model } = require('mongoose');
const moment = require('moment');


const AlbumSchema = Schema({

	name: {
		type: String
	},

	description: {
		type: String
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	estado: {
		type: Boolean,
		default: true
	},

	privateAlbum: {
		type: Boolean,
		default: true
	},

	created_at: {
		type: Date,
		default: moment().format()
	}
});


AlbumSchema.method('toJSON', function () {
	const { __v, estado, _id,  ...album } = this.toObject();
	album.album_id = _id;
	return album;
});



module.exports = model('Album', AlbumSchema);

