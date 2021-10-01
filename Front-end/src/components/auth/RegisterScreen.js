import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'



export const RegisterScreen = () => {

	const [formValues, handleInputChange] = useForm({ name: '', email: '', password: '' });
	const { name, email, password } = formValues;
	const dispatch = useDispatch();

	const handleSubmitRegister = (e) => {

		e.preventDefault();
		dispatch(startRegister(name, email, password));


	}

	return (
		<>
			<div className="auth__form-container resgister">
				<h2>Registrate</h2>
				<form className="auth__form" onSubmit={handleSubmitRegister} >

					<input
						onChange={handleInputChange}
						value={name}
						name="name"
						type="text"
						autoComplete="off"
						className="auth__input"
						placeholder="Nombre"
					/>

					<input
						onChange={handleInputChange}
						value={email}
						name="email"
						type="email"
						autoComplete="off"
						className="auth__input"
						placeholder="Correo"
					/>

					<input
						onChange={handleInputChange}
						value={password}
						name="password"
						type="password"
						autoComplete="off"
						className="auth__input"
						placeholder="Contraseña"
					/>

					<button type="submit" className="auth__input" >Ingresar</button>
				</form>
				<div className="auth__register">
					<p>¿Ya tienes una cuanta?<Link className="color-help" to="/auth/login">login</Link> </p>
				</div>
			</div>
		</>
	)
}
