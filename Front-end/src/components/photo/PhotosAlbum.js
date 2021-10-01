import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadedPhotosByAlbumID } from '../../actions/photo';
import { Spinner } from '../ui/Spinner';


export const PhotosAlbum = () => {

	const dispatch = useDispatch();
	const { photos, totalPhotos } = useSelector(state => state.photo)

	useEffect(() => {

		dispatch(startLoadedPhotosByAlbumID());

	}, [dispatch])


	const handleShowInfoImg  = ( photo ) => {
		console.log(photo);
	}


	if (totalPhotos === 0) {

		return (
			<div>
				<h2>Este album no contiene fotos </h2>

			</div>
		)

	}


	return (
		<>
		
			<div className="album__container">
				{photos.length === 0 && <Spinner color="#212529" bg="#fff" />}

				<div className="photo__grid">
					{
						photos.map(p => (
							// TODO:: Crear component para las imagenes
							<div key={p.photo_id}  onClick={ () =>  handleShowInfoImg(p) }>
								<img src={p.photo} alt="foto album" />
							</div>
						))
					}
				</div>
			</div>
		</>
	)




}

