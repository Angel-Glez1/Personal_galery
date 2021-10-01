const { ObjectId } = require('mongoose').Types;
const { request, response } = require('express');
const { isOwnerAlbum } = require('../helpers');
const { Album } = require('../models');


// GET
const getAlbumsByUserId = async (req = request, res = response) => {

	const { limit = 10, offset = 0 } = req.query;
	const { _id } = req.user;


	// Filter to get all albums of the logged in user
	const filter = { user: ObjectId(_id), estado: true }

	// Querys 
	const querys = [
		Album.countDocuments(filter),
		Album
			.find(filter)
			.populate('user', 'name')
			.sort({ 'created_at': -1 })
			.skip(Number(offset))
			.limit(Number(limit))
	]


	const [count, results] = await Promise.all(querys);
	res.status(200).json({ ok: true, count, results });


}


// GET By ID
const getAlbumById = async (req = resquest, res = response) => {

	const { _id } = req.user;
	const { id } = req.params;


	const isOwner = await isOwnerAlbum(_id, id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}


	const album = await Album.findById(id).populate('user', 'name');
	res.status(200).json({ ok: true, album });


}


// POST
const createAlbum = async (req = request, res = response) => {

	const { user, estado, created_at, ...dataAlbum } = req.body;
	dataAlbum.user = req.user._id;


	try {

		const album = new Album(dataAlbum);
		album.save();
		return res.status(201).json({ ok: true, album });


	} catch (e) {
		console.log(e)
		return res.status(500).json({ ok: false, msg: 'Speak with Admin' });

	}

}


// PUT
const updateAlbum = async (req = resquest, res = response) => {

	const { _id } = req.user;
	const { id } = req.params;
	const { user, estado, created_at, ...dataAlbum } = req.body;


	const isOwner = await isOwnerAlbum(_id, id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}



	try {

		const album = await Album.findByIdAndUpdate(id, dataAlbum, { new: true });
		return res.status(201).json({ ok: true, album });

	} catch (e) {

		console.log(e);
		return res.status(500).json({ ok: false, msg: 'Speak with the administrator' })

	}

}


// DELETE
const deleteAlbum = async (req = request, res = response) => {

	const { _id } = req.user;
	const { id } = req.params;


	const isOwner = await isOwnerAlbum(_id, id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}


	
	const album = await Album.findByIdAndUpdate(id, { estado: false }, { new: true });
	return res.status(201).json({ ok: true, album })


}


module.exports = {
	createAlbum,
	getAlbumsByUserId,
	updateAlbum,
	getAlbumById,
	deleteAlbum
}


