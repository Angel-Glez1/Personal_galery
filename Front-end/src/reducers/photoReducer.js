import { types } from "../types/types";

const initialState = {
	photos: [],
	photoActive: null,
}


export const photoReducer = (state = initialState, action) => {

	switch (action.type) {

		// Set album id
		case types.photoSetAlbumId:
			return {
				...state,
				albumID: action.payload
			}

		// Clear state
		case types.photoClear: 
			return {
				...initialState
			}


		// Get photos by ID album
		case types.photoLoaded:
			return {
				...state,
				photos: [...action.payload.photos],
				totalPhotos: action.payload.totalPhotos
			}

		// add new photos state
		case types.photoAddNew:
			return {
				...state,
				photos: [action.payload, ...state.photos]
			}



		default:
			return state;

	}

}