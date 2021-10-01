const { User, Album, Photo } = require('../models');

const isOwnerAlbum = async ( user_id = '', album_id ) => {
	
	const { user } = await Album.findById(album_id).where({ estado: true });
	
	if( user_id.toString() === user.toString()){

		return true;
		

	}else{
		
		return false;
	}

}



const isOwnerPhoto = async (user_id = '', photo_id) => {

	const { user } = await Photo.findById(photo_id).where({ estado: true });

	if (user_id.toString() === user.toString()) {

		return true;

	} else {

		return false;
	}

}


module.exports = {
	isOwnerAlbum,
	isOwnerPhoto
}