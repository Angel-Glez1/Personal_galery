const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Photo, Album } = require('../models');
const { isOwnerAlbum, isOwnerPhoto } = require('../helpers');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const getPhotosByUserId = async (req = request, res = response) => {

	const { _id } = req.user;
	const { limit = 10, offset = 0 } = req.query;

	const querys = [
		Photo.countDocuments({ user: ObjectId(_id) }).where({ estado: true }),
		Photo.find({ user: ObjectId(_id) })
			.populate('user', 'name')
			.populate('album', 'name')
			.sort({ 'created_at': -1 })
			.skip(Number(offset))
			.limit(Number(limit))
			.where({ user: ObjectId(_id) })
	];

	const [count, result] = await Promise.all(querys);
	return res.status(200).json({ ok: true, count, result });
}


const getPhotosByAlbumId = async (req = request, res = response) => {

	const { limit = 10, offset = 0 } = req.query;
	const { album_id } = req.params;
	const { _id } = req.user;

	const isOwner = await isOwnerAlbum(_id, album_id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}

	const filter = { album: ObjectId(album_id) }
	const querys = [
		Photo
			.countDocuments(filter)
			.where({ estado: true }),
		Photo
			.find(filter)
			.populate('user', 'name')
			.populate('album', 'name')
			.sort({ 'created_at': -1 })
			.skip(Number(offset))
			.limit(Number(limit))
			.where({ user: ObjectId(_id) })
	]

	const [count, result] = await Promise.all(querys);
	return res.status(200).json({ ok: true, count, result });
}


const getPhotoById = async (req, res = response) => {

	// Destructuring the object 'req'
	const { user: { _id }, params: { id } } = req;


	// Validate that you are the owner of the photo
	const isOwner = await isOwnerPhoto(_id, id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}

	const photo = await Photo.findById(id).where({ estado: true });
	return res.json({ ok: true, photo });


}


const newphoto = async (req, res = response) => {

	const { tempFilePath, name } = req.files.photo;
	const { body, user } = req;

	// Validate extension
	const nameArr = name.split('.');
	const extension = nameArr[nameArr.length - 1];
	const valid_extension = ['png', 'gif', 'jpg', 'jpeg'];
	if (!valid_extension.includes(extension)) {
		return res.status(400).json({ ok: false, msg: `Only ${valid_extension} files are accepted` });
	};

	// Is owner album 
	const isOwner = await isOwnerAlbum(user._id, body.album);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}


	const data = {
		album: body.album,
		user: user._id,
		name: body.name ? body.name : null
	}

	// Upload photon in cloudinary.
	try {

		const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
		data.photo = secure_url;

		
	} catch (e) {

		console.log(e);
		return res.status(500).json({ ok: false, msg: e });
	}


	const photo = new Photo(data);

	try {

		photo.save();
		return res.json({ ok: true, photo });

	} catch (e) {
		console.log(e)
		return res.status(500).json({ ok: true, msg: 'Speak with Admin' });
	}


}


const updatePhoto = async (req, res = response) => {

	// Destructuring the object 'req'
	const { user: { _id }, params: { id }, body: { name, album } } = req;
	const dataPhoto = {};

	// Validate that you are the owner of the photo
	const isOwner = await isOwnerPhoto(_id, id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}

	// Update album
	if (album) {

		// exits album
		if (!await Album.findById(album).where({ estado: true })) {
			return res.status(400).json({ ok: false, msg: 'There is no album with this ID' });
		}


		if (!await isOwnerAlbum(_id, album)) {
			return res.status(400).json({ ok: false, msg: 'You cannot use an album that does not belong to you' });
		}

		dataPhoto.album = album

	}

	// Update Name
	if (name) {
		dataPhoto.name = name
	}

	const photo = await Photo.findByIdAndUpdate(id, dataPhoto, { new: true });
	return res.json(photo);

}



const deletePhoto = async (req, res = response) => {

	const { user: { _id }, params: { id } } = req;


	// Validate that you are the owner of the photo
	const isOwner = await isOwnerPhoto(_id, id);
	if (!isOwner) {
		return res.status(400).json({ ok: false, msg: 'You do not have the necessary permits.' });
	}

	const photo = await Photo.findByIdAndUpdate(id, { estado: false }, { new: true });
	return res.status(202).json({ ok: true, photo });

}




module.exports = {
	newphoto,
	getPhotosByAlbumId,
	getPhotosByUserId,
	getPhotoById,
	updatePhoto,
	deletePhoto


}