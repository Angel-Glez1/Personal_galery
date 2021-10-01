import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fecth';
import { types } from '../types/types';


export const photoSetAlbum = (album_id) => ({
	type: types.photoSetAlbumId,
	payload: album_id
});

export const photosClearState = () => ({
	type: types.photoClear,
});



/*------------------------------------------
|		Get Photos By ID album
|-------------------------------------------*/

const photosLoaded = (photos, totalPhotos) => ({
	type: types.photoLoaded,
	payload: { photos, totalPhotos }
});

export const startLoadedPhotosByAlbumID = () => {

	return async (dispatch, getState) => {

		const { albumID } = getState().photo;

		const resp = await fetchConToken(`photo/${albumID}`);
		const data = await resp.json();

		if (data.ok) {

			dispatch(photosLoaded(data.result, data.count));

		} else {

			console.log(data.msg);
		}

	}

}


const photoAddNew = (photo) => ({
	type: types.photoAddNew,
	payload: photo
})

export const startAddPhoto = (file) => {

	return async (dispatch, getState) => {

		const baseUrl = process.env.REACT_APP_API_URL;
		const token = localStorage.getItem('token');
		const { album_id } = getState().album.activeAlbum;



		const formData = new FormData();
		formData.append('album', album_id);
		formData.append('photo', file);

		try {

			const resp = await fetch(`${baseUrl}/photo`, { headers: { 'x-token': token }, method: 'POST', body: formData })
			const data = await resp.json();

			if (data.ok) {


				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'La foto se guardo con exito',
					showConfirmButton: false,
					timer: 1000
				})

				dispatch(photoAddNew(data.photo));


			} else {
				Swal.fire('Error', data.msg, 'error');
			}


		} catch (e) {
			console.log(e);
		}




	}
}


