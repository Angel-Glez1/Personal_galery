const { Router } = require('express');
const { createRol } = require('../controllers/roleController');
const { validate_token, validate_is_admin } = require('../middlewares');
const router = Router();

router.use( validate_token );
router.use( validate_is_admin );



router.post('/', createRol);







module.exports = router;


