const { User, Album, Photo } = require('../models');


/*---------------------------------------------------
|				Collection User
|------------------------------------------------------*/

const issetEmail = async (email = '') => {
	const _email = await User.findOne({ email });
	if (_email) throw new Error(`These credentials already exist`);
}


const issetUserById = async (id) => {
	const issetUser = await User.findById(id).where({ estado: true });;
	if (!issetUser) throw new Error(`There is no user with this id ${id}`);
}



/*---------------------------------------------------
|				Collection Album
|------------------------------------------------------*/
const issetAlbumById = async (id) => {

	const issetAlbum = await Album.findById(id).where({ estado: true });
	if (!issetAlbum) throw new Error(`There is no album with this ID`);

}



/*---------------------------------------------------
|				Collection Photo
|------------------------------------------------------*/
const issetPhotoById = async (id) => {
	const issetPhoto = await Photo.findById(id).where({ estado: true });
	if (!issetPhoto) throw new Error(`There is no photo with this id ${id}`);
}






module.exports = {
	issetAlbumById,
	issetEmail,
	issetPhotoById,
	issetUserById,
}