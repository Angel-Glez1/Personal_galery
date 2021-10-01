import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { albumClearActive } from '../../actions/album';
import { photosClearState } from '../../actions/photo';
import { uiLoadComponet, uiOpenModal } from '../../actions/ui';
import { types } from '../../types/types';



export const ItemSideBar = ({ name, classIcon }) => {

	const dispatch = useDispatch();


	const handleAddNewPhotosOrAlbum = () => {
		// Clear active 
		dispatch(albumClearActive());
		dispatch(uiOpenModal(name));
	}


	const handleLoadAlbumsOrPhotos = () => {

		const nameComponent = (name === 'album')
			? types.uiCallComponentAlbums
			: types.uiCallComponentPhotos;

		dispatch(photosClearState());
		dispatch(uiLoadComponet(types.uiCallComponentAlbums));
	}



	return (
		<li>
			<div
				style={{ cursor: 'auto' }}
				className="aside__link"
			>
				<i
					className={`far ${classIcon}`}
				></i>
				<span>{name}</span>
			</div>

			{/* Submenu */}
			<ul>
				<li>
					<div
						onClick={handleLoadAlbumsOrPhotos}
						className="aside__link"
					>
						<FontAwesomeIcon
							icon={faList}
						/>
						<span>Ver todos</span>
					</div>
				</li>
				<li>
					<div
						onClick={handleAddNewPhotosOrAlbum}
						className="aside__link"
					>
						<FontAwesomeIcon
							icon={faPlus}
						/>
						<span>Agregar Nuevo</span>
					</div>
				</li>
			</ul>
		</li>
	)
}
