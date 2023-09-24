const Minio = require("minio");

const minioClient = new Minio.Client({
	endPoint: "192.168.20.2",
	port: 9000,
	accessKey: "v04oaC93e1HhJyMvrq1y",
	secretKey: "nrTyYqmLKVAADJn3bgNerO6fnnJTzoZQAUtIkUJf",
	useSSL: false,
});

exports.uploadImages = (imageName, imageStream, imageType) => {
	let bucketName = "imagenes";
	if (!minioClient.bucketExists(bucketName)) {
		minioClient.makeBucket(bucketName);
		console.log(`The minio bucket ${bucketName} has been created.`);
	}

	try {
		minioClient.putObject(
			bucketName,
			imageName + "." + imageType,
			imageStream,
			"image/*",
			function (e) {
				if (e) return console.log(e);

				console.log("Image uploaded correctly");
			}
		);
	} catch (error) {
		throw error;
	}
};

exports.getImage = async (bucketName, imageName) => {
	const imageStream = new Promise((resolve, reject) => {
		let imageBufferArray = [];
		minioClient
			.getObject(bucketName, imageName)
			.then((imageStream) => {
				imageStream.on("error", (err) => {
					console.log(err);
					reject(err);
				});
				imageStream.on("data", (arrayBuffer) => {
					imageBufferArray.push(arrayBuffer);
				});
				imageStream.on("end", () => {
					resolve(imageBufferArray);
				});
			})
			.catch(reject);
	});
	return Buffer.concat(await imageStream);
};
