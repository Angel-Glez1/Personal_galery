const { Router } = require('express');
const { check } = require('express-validator');
const {  validate_token, validate_camps } = require('../middlewares');
const router = Router();

const { 
	createFollow, 
	getFollowsByUserId, 
	getFollowsAlbums, 
	getPhotosFollow,
	deleteFollow
} = require('../controllers/followControler');
/*----------------------------------------------
| 			Path
|-----------------------------------------------
|
|	La url que apuntan a estos enpoints es:
|	<host>/api/follow
*/


router.use(validate_token);

router.get('/albums', getFollowsAlbums);

router.get('/users', getFollowsByUserId );


router.get('/photos/:album_id?', getPhotosFollow );


router.post(
	'/',
	[
		check('followed', 'ID followed is required').trim().not().isEmpty(),
		check('followed', 'Invalid ID').isMongoId(),
		validate_camps
	],
	createFollow
);



router.delete('/:followed', deleteFollow );

module.exports = router;