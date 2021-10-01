import { fetchConToken, fetchSinToken } from "../helpers/fecth";
import { types } from "../types/types";

// Actions Sincronas
const login = (user) => ({
	type: types.authLogin,
	payload: user
})

export const startLogin = (email, password) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken('auth/login', { email, password }, 'POST');
			const body = await resp.json();

			if (body.ok) {

				const { token, user } = body;
				localStorage.setItem('token', token);
				localStorage.setItem('token-init-date', new Date().getTime());

				dispatch(login(user));

			} else {

				console.log(body)
			}

		} catch (e) {
			console.log('Servidor fuera de servicio');
		}
	}
}

export const startRegister = ( name, email, password  ) => {
	return async (dispatch) => {


		try{

			const resp = await fetchSinToken('auth/signup', {name, email, password}, 'POST');
			const body = await resp.json();

			if (body.ok) {

				const { token, user } = body;
				localStorage.setItem('token', token);
				localStorage.setItem('token-init-date', new Date().getTime());

				dispatch(login(user));

			} else {

				console.log(body);

			}

		}catch( e ) {

			console.log(e);
			console.log('Servidor bad')
		}
		


	}
}




const checkingFinish = () => ({
	type: types.authCheckingFinish

});

// Hace un checking del token del usuario si el token
export const startCheckig = () => {

	return async (dispatch) => {


		try{
			const resp = await fetchConToken('auth/renew');
			const body = await resp.json();

			if (body.ok) {

				const { token, user } = body;

				localStorage.setItem('token', token);
				localStorage.setItem('token-init-date', new Date().getTime());
				dispatch(login(user));

			}else {

				dispatch( checkingFinish() );
			}



		}catch(e){
			console.log('Servidor fuera de servicio');
		}
	


	}
}




