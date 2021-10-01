const { Router } = require('express');
const { search } = require('../controllers/searchController');
const { validate_token } = require('../middlewares');

/**
 * Path
 * <host>/api/search
 */
const router = Router();


router.use(validate_token)


router.get('/:collection/:term', search);


module.exports = router;
