const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Follow, Album, Photo } = require('../models');

/*
*  Get the albums of followed users
*/
const getFollowsAlbums = async (req, res) => {

	const { limit = 10, offset = 0 } = req.query;

	// Get followed users
	const { _id } = req.user;
	const followeds = await Follow.find({ follower: ObjectId(_id) })
		.sort({ 'created_at': -1 })
		.limit(10);

	// Get id user followed  
	const arrUserId = followeds.map(f => ObjectId(f.followed));

	// Querys...
	const querys = [
		Album.countDocuments({ user: { $in: arrUserId } })
			.where({ privateAlbum: false }),

		Album.find({ user: { $in: arrUserId } })
			.sort({ 'created_at': -1 })
			.skip(Number(offset))
			.limit(Number(limit))
			.where({ privateAlbum: false })
	];

	const [count, result] = await Promise.all(querys);
	return res.status(200).json({ ok: true, count, result });

}


/**
 *Get last 10 photos or return photos from an album
 */
const getPhotosFollow = async (req, res = response) => {

	const { limit = 10, offset = 0 } = req.query;
	const { album_id } = req.params;
	const { _id } = req.user;


	// Get followed users
	const followeds = await Follow.find({ follower: ObjectId(_id) })
		.sort({ 'created_at': -1 })
		.limit(10);

	// Get id users followed  
	const idsFollowedUsers = followeds.map(f => ObjectId(f.followed));

	// Filtro para obtener las fotos de un album de un usuario seguido.
	const filter = album_id ? { album: album_id } : {};

	// Querys...
	const querys = [
		Photo.countDocuments({ user: { $in: idsFollowedUsers }, estado: true }).where(filter),

		Photo.find({ user: { $in: idsFollowedUsers }, estado: true })
			.sort({ 'created_at': -1 })
			.populate('user', 'name')
			.skip(Number(offset))
			.limit(Number(limit))
			.where(filter)
	]


	const [count, result] = await Promise.all(querys);
	return res.status(200).json({ ok: true, count, result });


}


// Get all follower the in user 
const getFollowsByUserId = async (req, res = response) => {

	const { limit = 10, offset = 0 } = req.query;
	const { _id } = req.user;

	const filter = { follower: ObjectId(_id) }
	const querys = [
		Follow.countDocuments(filter),
		Follow.find(filter)
			.sort({ 'created_at': -1 })
			.populate('follower', 'name')
			.populate('followed', 'name')
			.skip(Number(offset))
			.limit(Number(limit))
	]


	const [count, result] = await Promise.all(querys);
	return res.status(200).json({ ok: true, count, result });

}


const createFollow = async (req, res = response) => {


	if (req.user._id.toString() === req.body.followed) {
		return res.status(400).json({ msg: 'You cannot follow yourself' });
	}

	const data = {
		follower: req.user._id,
		followed: req.body.followed
	}

	const issetFollow = await Follow.find({ $and: [{ follower: data.follower }, { followed: data.followed }] });
	if (issetFollow.length > 0) {
		return res.status(400).json({ msg: 'You already follow this user' });
	}


	try {

		const follow = new Follow(data);
		await follow.save();
		return res.status(201).json({ ok: true, follow });


	} catch (e) {

		console.log(e);
		return res.status(500).json({ msg: 'Speack with Admin' });

	}

}


const deleteFollow = async (req, res = response) => {

	const { user: { _id }, params: { followed } } = req;

	const issetFollow = await Follow.findOne({
		$and: [
			{ follower: ObjectId(_id) },
			{ followed: ObjectId(followed) }
		]
	});

	if(!issetFollow){
		return res.status(400).json({ ok: false, msg: 'You do not follow that user'});
	}

	await Follow.findByIdAndRemove(issetFollow._id);
	return res.status(202).json({ ok: true, msg: 'You stopped following the user'})

}




module.exports = {
	createFollow,
	getFollowsByUserId,
	getFollowsAlbums,
	getPhotosFollow,
	deleteFollow

}