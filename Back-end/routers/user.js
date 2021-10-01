const { Router } = require('express');
const { check } = require('express-validator');
const { issetUserById } = require('../helpers');
const { validate_token, validate_camps, haveRole } = require('../middlewares');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = Router();

/*----------------------------------------------
| 			Path
|-----------------------------------------------
|
|	La url que apuntan a estos enpoints es:
|	<host>/api/user
*/
router.use(validate_token);

// Get all users
router.get( '/', getUsers );


// Get a user by id
router.get(
	'/:id',
	[
		check('id', 'Invalid ID').isMongoId(),
		check('id').custom(issetUserById),
		validate_camps
	],
	getUserById
);


// Update user by id 
router.put(
	'/:id',
	[
		check('id', 'Invalid ID').isMongoId(),
		check('id').custom(issetUserById),
		validate_camps
	],
	updateUser
);


// Delete a user , if you are an administrator
router.delete(
	'/:id',
	[
		haveRole('ADMIN_ROL'),
		check('id', 'Invalid ID').isMongoId(),
		check('id').custom(issetUserById),
		validate_camps
	],
	deleteUser
)





module.exports = router;