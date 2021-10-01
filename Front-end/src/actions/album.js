import { fetchConToken } from '../helpers/fecth';
import Swal from 'sweetalert2';
import { types } from '../types/types';
import { uiLoadComponet } from './ui';


export const albumSetActive = (album) => ({
	type:  types.albumActive,
	payload: album
});


export const albumClearActive = () => ({
	type: types.albumClearActived
})



/*----------------------------------------------
| Create new Album
|-----------------------------------------------
*/
const albumAddNew = (album) => ({
	type: types.albumAddNew,
	payload: album
})

export const startAlbumAddNew = (album) => {

	return async (dispatch) => {

		try {
			
			const resp = await fetchConToken('album', album , 'POST');
			const body = await resp.json();

			if (body.ok) {

				dispatch(albumAddNew(body.album, ));
				Swal.fire('Exito', `Album creado con exito`, 'success');
				dispatch( uiLoadComponet( types.uiCallComponentAlbums ) );


			} else {
				console.log(body)
				Swal.fire('Error', body.msg, 'error');

			}



		} catch (e) {
			console.log(e);
		}

	}


}


/*----------------------------------------------
| Get album the user
|-----------------------------------------------
*/
const albumsLoaded = (albums, totalAlbums) => ({
	type: types.albumLoaded,
	payload: {albums, totalAlbums}
})

export const startAlbumsLoaded = () => {
	return async (dispatch) => {

		try {

			const resp = await fetchConToken('album');
			const {  results, count   } = await resp.json();

			
			dispatch(albumsLoaded(results, count ));


		} catch (error) {
			
			console.log(error);
		}
	}
}

/*----------------------------------------------
| Update album
|-----------------------------------------------
*/
const albumUpdated = (  activeAlbum ) => ({
	type: types.albumUpdate,
	payload: activeAlbum
});

export const startAlbumUpdated = (album) => {
	return async (dispatch, getState ) => {

		const { album_id } = getState().album.activeAlbum;

		try {

			const resp = await fetchConToken(`album/${album_id}`, album , 'PUT');
			const body = await resp.json();
			
			if (body.ok) {

				
				dispatch(albumUpdated(body.album));
				Swal.fire('Exito', `Se actualizo album exitosamente`, 'success');

				


			} else {
				console.log(body)
				Swal.fire('Error', body.msg, 'error');

			}



		} catch (e) {
			console.log(e);
		}

	}
}



/*----------------------------------------------
| Delete album
|-----------------------------------------------
*/ 
const albumDeleted = () => ({
	type: types.albumDeleted
})

export const startAlbumDelete  = () => {

	return async (dispath, getState)=> {
		try{

			const { album_id } = getState().album.activeAlbum;

			const resp = await fetchConToken(`album/${album_id}`, {}, 'DELETE');
			const body = await resp.json();

			dispath(albumDeleted());
			
			if(body.ok){
				Swal.fire(
					'Exito',
					`Album eliminado correctamente`,
					'success'
				);
			}

		}catch(e){
			console.log(e)

		}
	}

}