const db = require("../config/sequelize");
const User = db.user;
const minioClient = require("../request/minio");

exports.updateImage = async (req, res) => {
	try {
		const { id, imageName, imageStream, imageType } = req.body;

		if (
			imageName == undefined ||
			imageStream == undefined ||
			imageType == undefined
		) {
			res.status(422).send({
				message:
					"El nombre de la imagen, el base 64 o el tipo no pueden ser nulos.",
			});
			return;
		}

		const [rowCount] = await User.update(
			{ type: imageType, imageName: imageName },
			{ where: { idUser: id }, returning: true }
		);

		if (rowCount == 0) {
			res.status(404).send({
				message:
					"Error, No se pudo actulizar al imagen. Usuario no encontrado.",
			});
		}

		minioClient.uploadImages(
			imageName,
			Buffer.from(imageStream, "base64"),
			imageType
		);

		res.status(200).send({ message: "Imagen actualizada correctamente." });
	} catch (error) {
		res.status(500).send({
			message: `Hubo un error al  momento de actualizar el archivo: ${error}.`,
		});
		return;
	}
};

exports.getImage = async (req, res) => {
	try {
		const { image_name } = req.params;
		const userData = await User.findOne({ where: { imageName: image_name } });

		if (!userData) {
			res.status(422).send({
				message:
					"No se pudo encontrar el usuario asociado a el nombre de la imagen",
			});
			return;
		}

		const { imageType } = userData.dataValues;

		if (image_name == undefined) {
			res
				.status(422)
				.send({ message: "El nombre de la imagen es obligatorio." });
			return;
		}

		const bufferOfImage = await minioClient.getImage(
			process.env.BUCKET_USER_PROFILE_IMAGES_NAME.toString(),
			`${image_name}.${imageType}`
		);

		if (!bufferOfImage) {
			res.status(422).send({ message: "Hubo un error al obtener la imagen." });
			return;
		}

		res.set("content-type", `image/${imageType}`);
		res.status(200).send(bufferOfImage);

	} catch (error) {
		res.status(500).send({
			message: `Hubo un error al  momento de obtener la imagen de perfil: ${error}.`,
		});
		return;
	}
};
