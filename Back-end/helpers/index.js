

const DDBB_validator = require('./DB-validator');
const generateToken = require('./generate-JWT');
const validateOwner = require('./validate-owner');

module.exports = {
	...DDBB_validator,
	...generateToken,
	...validateOwner
}
