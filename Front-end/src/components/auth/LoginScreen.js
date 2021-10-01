import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

	const [values, handleInputChange] = useForm({ email: '', password: '' });
	const { email, password } = values;
	
	
	const dispatch = useDispatch();
	const handleSubmitLogin = ( e ) => {

		e.preventDefault();	
		dispatch( startLogin( email, password ) );
		
	}


	return (
		<>
			<div className="auth__presentation" >
				<div className="auth__question" >
					<h2>¿Quienes somos?</h2>
				</div>
				<div className="auth__description">
					<p>
						Personal<span className="color-help bold">Gallery</span>
						una plataforma donde puedes subir tus images
						y compartilas con los que mas quieres...
					</p>
				</div>

			</div>

			<div className="auth__form-container">
				<h2>Iniciar Sesión</h2>
				<form 
					onSubmit={ handleSubmitLogin }
					className="auth__form">
					<input
						onChange={ handleInputChange }
						value={ email }
						name="email"
						type="email"
						autoComplete="off"
						className="auth__input"
						placeholder="Correo" />
					<input
						name="password"
						type="password"
						onChange={ handleInputChange }
						value={ password }
						autoComplete="off"
						className="auth__input"
						placeholder="Contraseña" />
					<button type="submit" className="auth__input">Ingresar</button>
				</form>
				<div className="auth__register">
					<p>¿No tienes una cuenta? <Link className="color-help" to="/auth/register">Registrate</Link> </p>
				</div>
			</div>
		</>
	)
}
