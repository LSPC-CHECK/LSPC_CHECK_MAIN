module.exports = (app) => {
	const router = require("express").Router();
	const authorization = require("../middleware/auth");
	const uploadImage = require("../controllers/uploadImage.controller");

	router.put("/new_user_image", authorization.verifyToken, uploadImage.updateImage);
	app.use("/api/image", router);
};
