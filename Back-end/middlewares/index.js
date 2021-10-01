
const validateToken = require('./validate-token');
const validateCamps = require('./validate-camps');
const validatePhoto = require('./validate-photo');
const validateRole  = require('./validate-rol');  

module.exports = {
	...validateToken,
	...validateCamps,
	...validatePhoto,
	...validateRole
}
