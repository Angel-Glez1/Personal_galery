import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone';

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#e59500',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#000',
	outline: 'none',
	transition: 'border .24s ease-in-out',
	textAlign: 'center'
};

const activeStyle = {
	borderColor: '#2196f3',
};

const acceptStyle = {
	borderColor: '#00e676',
};

const rejectStyle = {
	borderColor: '#ff1744',
};

export const DropZone = ({ setFiles }) => {

	const onDrop = useCallback(acceptedFiles => {

		// Change state in component father
		setFiles(acceptedFiles)

	}, [setFiles])

	const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		multiple: true,
		accept: 'image/*',
		noClick: false,
		disabled: false,
		maxFiles: 10
	});


	console.log(isDragReject)


	const files = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));


	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : { activeStyle }),
		...(isDragAccept ? acceptStyle : { acceptStyle }),
		...(isDragReject ? rejectStyle : { rejectStyle })
	}), [isDragActive, isDragReject, isDragAccept]);

	return (
		<div {...getRootProps({ style })}>
			<input {...getInputProps()} />
			<div style={{maxWidth: '100%', fontSize: "1.5rem"}} >

				{
					// TODO:: Hacer cambios en mi interfaze
					console.log(acceptedFiles )
				}

				{
					(acceptedFiles.length === 0 && !isDragReject )  && (
						<>
							<p>Arrasta y suelta un <b>maximo de 10</b> fotos</p>
							<p>ó</p>
							<p>Haz CLICK para seleccionar tus archivos</p>
							<p>Recuerda que solo puedes subir archivos del tipo: <span className="bold">png, jpg jpeg</span> </p>
						</>
					)
				}

				{
					isDragReject && 
					(
						<>
							<FontAwesomeIcon  icon={ faExclamationCircle } size="5x" color="red" />
							<p>Algo salio mal</p>
							<p>Revisa que estes cumpliendo con los requerimientos para subir los Archivos</p>
							<p> maximo 10 fotos y solo archivos con extension <b>png, jpg jpeg</b> </p>
						</>
					)
				}


				{ 
					isDragAccept && <FontAwesomeIcon icon={faCheck} size="5x" color="green" />
				}

				{
					acceptedFiles.length > 0 &&
					(<aside style={{ color: "black" }} >
						<h4>Fotos</h4>
						<p>Num Archivos : {acceptedFiles.length}</p>
						<ul>{files}</ul>
					</aside>
					)
				}
			</div>
		</div>
	)
}
