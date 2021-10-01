const validate_photo = async (req, res, next) => {

	// Validate exist photo in request
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.photo) {
		return res.status(400).json({
			ok: false,
			msg: 'No photo in the petition'
		});
	}

	next();
}





module.exports = {
	validate_photo
}