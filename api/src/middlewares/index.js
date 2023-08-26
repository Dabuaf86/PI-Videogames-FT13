const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const baseNameHelper = require('../helpers/index');
const storage = multer.diskStorage({
	destination: path.join(__dirname, '../../public/new-games'),
	filename: (req, file, cb) => {
		const filebase = file.originalname.split();
		cb(
			null,
			// baseNameHelper(file.originalname) +
				uuidv4() +
				path.extname(file.originalname).toLowerCase()
		);
	},
});

module.exports = storage;
