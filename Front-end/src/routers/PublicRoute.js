import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router'

/**
 * Esta componente se encarga de cargar las rutas publicas si el usuario esta logueado.
 * 
 * @param {Boolean}  isAuthenticated Es la bandera que define si un usuario esta logueado o no  
 * @param {Function} component Es el componente que se rederiza al entrar a un ruta privado
 * @param {String}   rest Es el resto que de mi componente como el path el exact etc.
 * @returns 
 */
export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) => (
				(isAuthenticated)
					? (<Redirect to="/" />)
					: (<Component {...props} />)
			)}
		/>
	)
}

PublicRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}