const { Router } = require('express');
const { check } = require('express-validator');
const { issetAlbumById, isOwnerAlbum} = require('../helpers');
const { validate_camps, validate_token } = require('../middlewares');
const { createAlbum, getAlbumsByUserId, updateAlbum, getAlbumById, deleteAlbum } = require('../controllers/albumController');
const router = Router();
/*----------------------------------------------
| 			Path
|-----------------------------------------------
|
|	La url que apuntan a estos enpoints es:
|	<host>/api/album
*/

router.use(validate_token);


router.get('/', getAlbumsByUserId);


router.get(
	'/:id',
	[
		check('id', 'the id is invalid').isMongoId(),
		check('id').custom(issetAlbumById),
		validate_camps
	],
	getAlbumById
);


router.post(
	'/',
	[
		check('name', 'name is required').trim().not().isEmpty(),	
		validate_camps
	],
	createAlbum
);


router.put(
	'/:id',
	[
		check('id', 'Album id is required').trim().not().isEmpty(),
		check('id', 'the id is invalid').isMongoId(),
		check('id').custom(issetAlbumById),
		validate_camps
	],
	updateAlbum

);

router.delete(
	'/:id',
	[
		check('id', 'the id is invalid').isMongoId(),
		check('id').custom(issetAlbumById),
		validate_camps
	],
	deleteAlbum
);


module.exports = router;
