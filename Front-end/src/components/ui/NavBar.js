import {  faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { uiShowMenu } from '../../actions/ui';

export const NavBar = () => {
	
	const dispatch = useDispatch();
	const { showSideMenu } = useSelector(state => state.ui);

	const [stateSideMenu, setStateSideMenu] = useState(false);


	const handleShowSideMenu = () => {

		setStateSideMenu(!stateSideMenu );
		dispatch(uiShowMenu(stateSideMenu) );
	}


	return (
		<header className="nav__header">

			<div className="nav__logo">				
				<Link to="/">
					<p>Personal<span className="color-help bold">Gallery</span></p>
				</Link>

				<div 
					className="nav__btn-sidemenu"
					onClick={handleShowSideMenu}
					style={{ cursor: 'pointer' }}
				>
					<FontAwesomeIcon icon={showSideMenu ? faArrowLeft : faArrowRight} />
				</div>
			</div>

			<nav className="nav__navbar">
			
				<button 
					className="nav__btn-logout"
				>
					Cerrar Sesion
				</button>
			</nav>
		</header>
	)
}
