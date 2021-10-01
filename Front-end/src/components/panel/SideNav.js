import React from 'react'
import { useSelector } from 'react-redux';

import { ItemSideBar } from './ItemSideBar';

export const SideNav = () => {
	const { name } = useSelector(state => state.auth);

	return (
		<aside className="aside__container" >

			<div>
				<div className="aside__user">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" fill="#fff">
						<path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z" />
						<path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z" />
					</svg>
					<p>
						¡Hola! <br />
						<span className="bold">
							{name}
						</span>
					</p>
				</div>

				<div className="aside__search">
					<input
						type="text"
						name="search"
						className="search"
						placeholder="Buscar Usuario..."
					/>
				</div>

				<div className="aside__menu-user">
					<h2>Menú</h2>
					<ul className="aside__menu">
						<ItemSideBar name="album" classIcon="fa-folder" />
						{/* <ItemSideBar name="fotos" classIcon="fa-image" /> */}
					</ul>
				</div>
			</div>
		</aside>
	)
}
