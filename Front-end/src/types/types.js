/**
 * Types the my application.
 */
export const types = {

	//? Types for authReducer
	authCheckingFinish: '[auth] Finish Checking login state',
	authLogin: 	'[auth] Login',
	authLogout : '[auth] Logout',

	//? Types for uiReducer
	uiOpenModal: '[ui] open modal',
	uiCloseModal: '[ui] close modal',
	uiLoadComponet: '[ui] load component',

	//? Types for uploaded compontent
	uiShowSideMenu: '[ui] show sidemenu',
	uiCallComponentPhotos: '[ui] component photos',
	uiCallComponentAlbums: '[ui] component albums',
	uiCallComponentPhotosByAlbumId: '[ui] component photos album by ID',

	//? Types for albumReducer
	albumActive : '[album] set active album',
	albumClearActived: '[album] clear active album',
		//* CRUD
		albumAddNew: '[album] add new',
		albumLoaded: '[album] loaded albums' ,
		albumDeleted: '[album] delete album',
		albumUpdate: '[album] update album',

	//? Types for photoReducer
	photoFinishedLoading: '[photo] finished Loading get images',
	photoSetAlbumId: '[photo] set album id for show photos',
	photoClear: '[photo] clear State',
		//* CRUD 
		photoLoaded: '[photo] get photos by album ID',
		photoAddNew: '[photo] add new foto'









}