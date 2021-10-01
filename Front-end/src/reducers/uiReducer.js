import { types } from "../types/types";

const initalState = {
	modalOpen: false,
	loadComponet: 'PhotoFolloweds',
	showSideMenu: true
}

export const uiReducer = (state = initalState, action) => {

	switch (action.type) {

		// Show Asie menu
		case types.uiShowSideMenu: 
			return {
				...state,
				showSideMenu: action.payload
			}
		


		// Open window modal
		case types.uiOpenModal:
			return {
				...state,
				active: action.payload,
				modalOpen: true
			}

		// Close window modal
		case types.uiCloseModal:
			return {
				...state,
				modalOpen: false,
			}

		// Changes the component conditionally
		case types.uiLoadComponet:
			return {
				...state,
				loadComponet: action.payload
			}

		default:
			return state;

	}
}
