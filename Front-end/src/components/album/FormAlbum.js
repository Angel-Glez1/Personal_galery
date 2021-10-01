import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAlbumAddNew, startAlbumUpdated } from '../../actions/album';
import { photosClearState } from '../../actions/photo';
import { uiCloseModal } from '../../actions/ui';


const initAlbum = { name: '', description: '', privateAlbum: true };

//* THE FUNCTIONAL COMPONENT
export const FormAlbum = () => {

	const { activeAlbum } = useSelector(state => state.album);
	const dispatch = useDispatch();

	// State for formulario.
	const [formValues, setFormValues] = useState(initAlbum);
	const { name, description } = formValues;

	// Effect for update albums 
	useEffect(() => {

		if (activeAlbum) {

			setFormValues(activeAlbum);

		} else {
			setFormValues(initAlbum);
		}

	}, [activeAlbum, setFormValues])


	// Get information the form 
	const handleInputChange = ({ target }) => {
		setFormValues({ ...formValues, [target.name]: target.value });
	};


	// Handle for create new album or update
	const handleSubmitNewAlbum = (e) => {
		e.preventDefault();

		if (activeAlbum ){

			// TODO:: Update Album
			dispatch(startAlbumUpdated(formValues));
			
		
		}else{
			
			// TODO:: Create new Album
			dispatch(startAlbumAddNew(formValues));
		}



		dispatch(uiCloseModal());
		dispatch( photosClearState());

	}



	return (
		<form className="form" onSubmit={handleSubmitNewAlbum} >
			<input
				type="text"
				name="name"
				value={name}
				onChange={handleInputChange}
				placeholder="Nombre del album"
				autoComplete="off"
				className="input"
				style={{ marginTop: ".5rem" }}
			/>
			<input
				type="text"
				name="description"
				value={description}
				onChange={handleInputChange}
				placeholder="Descripcion"
				autoComplete="off"
				className="input"
				style={{ marginTop: ".5rem" }}
			/>


			<div className="album__btn-radio">
				<h2>Tipo de album</h2>
				<div className="album__option">
					<input
						type="radio"
						value={true}
						name="privateAlbum"
						id="private"
						onChange={handleInputChange}
						defaultChecked={!activeAlbum ? true : (activeAlbum.privateAlbum) ? true : false }
					/>
					<label htmlFor="private" >
						Privado
					</label>

					<input
						type="radio"
						value={false}
						name="privateAlbum"
						id="public"
						onChange={handleInputChange}
						defaultChecked={ !activeAlbum ? false : (!activeAlbum.privateAlbum) ? true : false }
						
					/>
					<label htmlFor="public" >
						Publico
					</label>
				</div>
			</div>
			<button
				className="input"
				style={{ marginTop: ".5rem" }}
			>
				{ activeAlbum ? "Actualizar" : "Crear" }
			</button>
		</form>
	)
}
