import React from 'react';
import { OrbitSpinner } from 'react-epic-spinners';

export const Spinner = ({ message = 'Porfavor Espere', color = '#e59500', size = 70, bg = "#000000d9" }) => {
	return (
		<div className="center-item-screen" style={{ background: bg }}>
			<OrbitSpinner size={size} color={color} />
			<p className="text-medium" style={{color : color}}  >{message}</p>
		</div>
	)
}
