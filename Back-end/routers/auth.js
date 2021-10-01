const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares and Helpers
const { validate_camps, validate_token } = require('../middlewares');
const { issetEmail } = require('../helpers');

// Controllers
const { login, signUp, renew_token } = require('../controllers/authController');
const router = Router();


// Path /api/auth/
router.post(
	'/login', 
	[
		check('email', 'Email invalid').isEmail(),
		check('password', 'Password is required').trim().not().isEmpty(),
		validate_camps                     
	],
	login
);


// Create a new user.
router.post(
	'/signup',
	[
		check('name', 'name is required and min 2 characters').trim().not().isEmpty(),
		check('password', 'password is required and min 6 characters').trim().not().isEmpty(),
		check('email', 'email invalido').isEmail(),
		check('email').custom(issetEmail),
		validate_camps                    
	],
	signUp 
);


router.get('/renew', validate_token, renew_token);

module.exports = router;
