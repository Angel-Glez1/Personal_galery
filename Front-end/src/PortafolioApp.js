import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';



const PortafolioApp = () => {
	return (
		<Provider store={ store } >
			<AppRouter/>
		</Provider>
	)
}

export default PortafolioApp;
