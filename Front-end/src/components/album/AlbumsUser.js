import moment from 'moment';
import Swal from 'sweetalert2';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { albumSetActive, startAlbumDelete, startAlbumsLoaded } from '../../actions/album';
import { uiLoadComponet, uiOpenModal } from '../../actions/ui';
import { Spinner } from '../ui/Spinner';
import { types } from '../../types/types';
import { photoSetAlbum } from '../../actions/photo';


export const AlbumsUser = () => {

	const dispatch = useDispatch();
	const { albums, totalAlbums } = useSelector(state => state.album);

	// Get albums user the backend
	useEffect(() => {
		dispatch(startAlbumsLoaded());
	}, [dispatch]);


	const handleAddPhotoAlbum = () => {
		dispatch(uiOpenModal('photo'));
	}

	// Show pertenen albu,
	const handleGetPhotosByAlbumID = (e) => {
		const albumID = e.target.getAttribute('data-album-id');

		dispatch(photoSetAlbum(albumID));

		dispatch(  uiLoadComponet( types.uiCallComponentPhotosByAlbumId ) );
	}


	// Set album active 
	const handleSetActiveAlbum = (album) => {
		dispatch(albumSetActive(album));
	}

	// Call the action that deletes an album
	const handleAlbumDelete = () => {

		Swal.fire({
			title: '¿Estas Seguro?',
			text: "Si eliminas un album, ya no lo podrias recuperar",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Estoy seguro!'
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(startAlbumDelete());
			}
		})

	}

	// Open windon modal for update album
	const handleAlbumUpdate = () => {
		dispatch(uiOpenModal("album"));

	}

	// Show submenu
	const handleShowSubmenu = (e) => {
		const submenu = e.target.nextElementSibling;
		submenu.classList.toggle('submenu-active')

		setTimeout(() => {
			submenu.classList.remove('submenu-active')

		}, 3000);
	}


	if (totalAlbums === 0) {

		return (
			<div>
				<h2>No tienes ningun album creado</h2>
			</div>
		)

	}

	return (
		<>
			<h2 className="album__title">Mis Albums</h2>

			<div className="album__container">

				{albums.length === 0 && <Spinner color="#212529" bg="#fff" />}

				{
					albums.map(a => (
						// TODO:: arreglar la propagacion de eventos
						<div className="album__content" key={a.album_id} onClick={() => handleSetActiveAlbum(a)}  >
							<div className="album__info">
								<h3
									className="album__name"
									onClick={handleGetPhotosByAlbumID}
									data-album-id={a.album_id}>
									{a.name}
								</h3>
								<p className="album__date"> Tipo: <span>{a.privateAlbum ? 'Privado' : 'Publico'}</span></p>
								<p className="album__date"> Descripción: <span>{a.description.length > 0 ? a.description : 'Album sin descripción'}</span></p>
								<p className="album__date"> Fecha de creación: <span>{moment(a.created_at).format('LL')}</span></p>
							</div>

							<div className="options">
								<button className="more-options" onClick={handleShowSubmenu}>
									...
								</button>
								<div className='submenu'>
									<ul>
										<li><div onClick={handleAlbumUpdate}>Editar</div></li>
										<li><div onClick={handleAlbumDelete}>Eliminar</div></li>
									</ul>
								</div>
								<button onClick={handleAddPhotoAlbum} className="btn" >
									<FontAwesomeIcon icon={faPlus} />
								</button>
							</div>

						</div>
					))
				}


			</div>

		</>
	)
}
