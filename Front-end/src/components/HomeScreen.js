import React from 'react';
import { useSelector } from 'react-redux';
import { types } from '../types/types';
import { AlbumsUser } from './album/AlbumsUser';
import { SideNav } from './panel/SideNav';
import { PhotoFolloweds } from './photo/PhotoFolloweds';
import { PhotosAlbum } from './photo/PhotosAlbum';
import { Modalapp } from './ui/Modalapp';


export const HomeScreen = () => {

	
	const { loadComponet, showSideMenu } = useSelector(state => state.ui);
	
	let componentActive;

	switch (loadComponet) {

		// Get all albums 
		case types.uiCallComponentAlbums:
			componentActive = <AlbumsUser />
			break;

		// Get photos by id Album
		case types.uiCallComponentPhotosByAlbumId:
			componentActive = <PhotosAlbum/>
			break;


		default:
			componentActive = <PhotoFolloweds />
	}




	return (
		<>
			<main className="main" >

				{ showSideMenu &&  <SideNav /> }
				<div className="component" >
					{ componentActive }					
				</div>
				
			</main>
			<Modalapp />
		</>

	)
}
