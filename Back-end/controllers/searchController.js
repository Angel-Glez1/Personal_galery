const { response } = require('express');
const { searchUser } = require('../helpers/search');
const permittedCollections = ['users', 'albums'];


const search = (req, res = response) => {


	const { collection, term } = req.params;

	if (!permittedCollections.includes(collection)) {
		return res.status(401).json({
			ok: false,
			msg: {
				esp: `Las colecciones Permitidas son ${permittedCollections}`,
				eng: `Allowed collections are ${permittedCollections}`
			}
		});
	}


	switch (collection) {

		case 'users':
			searchUser(term, res)
			break;

		default:
			return res.status(500).json({
				ok: false,
				msg: {
					esp: `Un no se ha implementado busqueda para ${collection} `,
					eng: `No search engine was implemented for ${collection} `
				}
			});

	}








}


module.exports = {
	search
}

