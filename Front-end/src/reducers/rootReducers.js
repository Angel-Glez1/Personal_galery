import { combineReducers } from 'redux';
import { albumReducer } from './albumReducer';
import { authReducer } from './authReducer';
import { photoReducer } from './photoReducer';
import { uiReducer } from './uiReducer';


export const rootReducer = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	album: albumReducer,
	photo: photoReducer
});


