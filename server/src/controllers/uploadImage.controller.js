const db = require("../config/sequelize");
const Image = db.user;
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

		const [rowCount] = await Image.update(
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
		res.status(400).send({
			message: `Hubo un error al  momento de actualizar el archivo: ${error}`,
		});
		return;
	}
};

exports.getImage = async (req, res) => {
	try {
		const id = req.params.id;

		const image = await Image.findByPk(id);

		if (image) {
			res.setHeader("content-Type", image.type);
			const blob = new Blob([image.data], { type: image.type });
			res.send(blob);
		} else {
			res
				.status(404)
				.send({ message: `No se encontro ninguna imagen con id ${id}` });
		}
	} catch (error) {
		res.status(404).send(error.message);
	}
};
