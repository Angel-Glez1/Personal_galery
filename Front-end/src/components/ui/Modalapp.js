import React from 'react';
import Modal from 'react-modal';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { FormAlbum } from '../album/FormAlbum';
import { FormPhoto } from '../photo/FormPhoto';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		
	}
};
Modal.setAppElement('#root');


export const Modalapp = () => {

	const { modalOpen , active } = useSelector(state => state.ui);
	
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch( uiCloseModal() );
	}


	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={ closeModal }
			style={ customStyles }
			closeTimeoutMS={100}
			overlayClassName="modal-fondo"	
		>
			
			<div
				style={{ 
					display: 'flex',  
					justifyContent: 'space-between', 
					alignItems: 'center',
					 width: '100%' 
				}}
			 >
				<h2>{ `New ${active}` }</h2>
				<div 
					onClick={closeModal} 
					style={{ cursor: 'pointer' }}
				 >
					<FontAwesomeIcon icon={ faTimesCircle }  size="3x" />
				</div>
			</div>
			<hr/>
			{ 
				//Loads the content of the modal depending on who has activated it (photos or album).
				active === 'album' 
							? ( <FormAlbum/> ) 
							: ( <FormPhoto/> ) 
			}

		</Modal>
	)
}
