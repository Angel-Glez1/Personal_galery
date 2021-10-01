import { types } from "../types/types"

const initalState = {
	albums: [],
	activeAlbum: null
}


export const albumReducer = (state = initalState, action) => {

	switch (action.type) {


		// Upload albums the DataBase
		case types.albumLoaded:
			return {
				...state,
				albums: [...action.payload.albums],
				totalAlbums: action.payload.totalAlbums
			}


		// Set active album
		case types.albumActive:
			return {
				...state,
				activeAlbum: action.payload
			}

		// Update album 
		case types.albumUpdate:
			return {
				...state,
				albums: state.albums.map(a => (a.album_id === action.payload.album_id) ? action.payload : a ),
				activeAlbum: null
			}

		// Create new Album
		case types.albumAddNew:
			return {
				...state,
				albums: [action.payload, ...state.albums]
			}

		// Clear active album
		case types.albumClearActived:
			return {
				...state,
				activeAlbum: null
			}
		
		// Delete album
		case types.albumDeleted:
			return{
				...state,
				albums: state.albums.filter(a => a.album_id !== state.activeAlbum.album_id  ),
				activeAlbum : null
			}

		default:
			return state
	}


}