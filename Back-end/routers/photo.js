const { Router } = require('express');
const { check } = require('express-validator');
const { validate_photo, validate_token, validate_camps } = require('../middlewares');
const { issetAlbumById, issetPhotoById } = require('../helpers');
const { newphoto, getPhotosByAlbumId, getPhotosByUserId, updatePhoto, deletePhoto, getPhotoById  } = require('../controllers/photoController');
const router = Router();

/*----------------------------------------------
| 			Path
|-----------------------------------------------
|
|	La url que apuntan a estos enpoints es:
|	<host>/api/photo
*/

router.use(validate_token);


router.get('/', getPhotosByUserId)

router.get(
	'/viewphoto/:id',
	[
		check('id', 'Invalid ID').isMongoId(),
		check('id').custom(issetPhotoById),
		validate_camps
	],
	getPhotoById
);

router.get(
	'/:album_id', 
	[
		check('album_id', 'Invalid ID').isMongoId(),
		check('album_id').custom(issetAlbumById),	
		validate_camps
	],
	getPhotosByAlbumId
);

router.post(
	'/',
	[
		validate_photo,
		check('album', 'The ID album is required').not().isEmpty(),
		check('album', 'Not valid ID').isMongoId(),
		check('album').custom(issetAlbumById),
		validate_camps
	],
	newphoto
);

router.put(
	'/:id',
	[
		check('id', 'Invalid ID').isMongoId(),
		check('id').custom(issetPhotoById),
		validate_camps
	],
	updatePhoto
);
 

router.delete(
	'/:id',
	[
		check('id', 'Invalid ID').isMongoId(),
		check('id').custom(issetPhotoById),
		validate_camps
	],
	deletePhoto
);



module.exports = router;