const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./src/routes/index.js');
const path = require('path');
const multer = require('multer');
const storage = require('./src/middlewares/index.js');
require('./src/db.js');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
server.use(
	multer({
		storage,
		dest: path.join(__dirname, '/public/new-games'),
		limits: { fileSize: 5000000 },
		fileFilter: (req, file, cb) => {
			const fileTypes = /jpeg|jpg|png/;
			const fileTypeTest = fileTypes.test(file.mimetype);
			const extNameTest = fileTypes.test(path.extname(file.originalname));
			if (fileTypeTest && extNameTest) return cb(null, true);
			cb(`Error: tipos de archivo soportados ${fileTypes}`);
		},
	}).single('image')
);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

server.use(routes);

// Static images
server.use(express.static(path.join(__dirname, 'public')));
// server.use('/public/new-games', express.static('./public/new-games'));

module.exports = server;
