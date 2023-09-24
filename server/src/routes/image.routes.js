module.exports = (app) => {
	const router = require("express").Router();
	const authorization = require("../middleware/auth");
	const image = require("../controllers/userImageProfile.controller");

	router.put("/new_user_image", authorization.verifyToken, image.updateImage);
	router.get(
		"/user/profile/:image_name",
		authorization.verifyToken,
		image.getImage
	);
	app.use("/api/image", router);
};
