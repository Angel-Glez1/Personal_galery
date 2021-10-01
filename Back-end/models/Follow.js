const { Schema, model } = require('mongoose');
const moment = require('moment');

const FollowSchema = Schema({

	// Id the user Follower
	follower: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Id user is  requires']
	},

	// Id user the followed
	followed: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'The user id to follow is required']
	},

	created_at: {
		type: Date,
		default: moment().format()
	}

});

FollowSchema.method('toJSON', function () {
	const { __v, _id, ...follow } = this.toObject();
	follow.follow_id = _id;
	return follow;
});

module.exports = model('Follow', FollowSchema);