const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


class Server {

	constructor() {

		this.app = express();
		this.port = process.env.PORT;
		this.path = {
			album:  '/api/album',
			auth:   '/api/auth',
			photo:  '/api/photo',
			role:   '/api/role',
			user:   '/api/user',
			follow: '/api/follow',
			search: '/api/search'
		}

		this.connectDDBB();

		this.middlewares();

		this.routers();
	}


	async connectDDBB() {

		await dbConnection();

	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.static('public'));
		this.app.use(express.json());
		this.app.use(fileUpload({
			useTempFiles: true,
			tempFileDir: '/tmp/',
			createParentPath: true
		}));
	}

	routers() {
		
		
		this.app.use(this.path.user,  require('../routers/user'));
		this.app.use(this.path.auth,  require('../routers/auth'));
		this.app.use(this.path.album, require('../routers/album'));
		this.app.use(this.path.photo, require('../routers/photo'));
		this.app.use(this.path.role,  require('../routers/role'));
		this.app.use(this.path.follow,  require('../routers/follow'));
		this.app.use(this.path.search,  require('../routers/search'));

	}

	listen() {
		this.app.listen(this.port, () => console.log(`app corriendo en el puerto ${this.port}`))
	}

}


module.exports = Server;