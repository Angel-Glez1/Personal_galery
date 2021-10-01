import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { startAddPhoto } from '../../actions/photo'
import { uiCloseModal } from '../../actions/ui'
import { DropZone } from './DropZone'

export const FormPhoto = () => {

	const dispatch = useDispatch()
	const {activeAlbum} = useSelector(state => state.album);
	const [files, setFiles] = useState([])

	


	const handleEnviar = () => {

		if( files.length === 0 ) {
			return Swal.fire( 'Error', 'Necesitar guardar al menos una foto', 'error' );
		}


		files.forEach( file => {
			dispatch(startAddPhoto(file))
		})


		dispatch(uiCloseModal());
		setFiles([]);
	}

	return (
		<div className="form">
			
			<p>Album : { activeAlbum.name } </p>

			<DropZone setFiles={setFiles} files={files} />
			
			<div style={{ marginTop: ".5rem" }} >
				<button onClick={handleEnviar} className="input" style={{ width: "100%" }} >
					Guardar
				</button>
			</div>
		</div>
	)
}
