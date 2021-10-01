import { types } from "../types/types";

/**
 * 
 * @param {String} target Bandera que indica quien abre el modal (album o fotos)
 * @returns 
 */
export const uiOpenModal = (target) => ({
	type: types.uiOpenModal,
	payload: target

})

export const uiShowMenu = (value) => ({
	type: types.uiShowSideMenu,
	payload: value
})

export const uiCloseModal = () => ({
	type: types.uiCloseModal
})

export const uiLoadComponet = (nameComponent) => ({
	type: types.uiLoadComponet,
	payload: nameComponent
});


