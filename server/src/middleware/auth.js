const jwt = require("jsonwebtoken");

// Funcion para verifcar el token y autirazr el acceso a la base de datos
exports.verifyToken = function (req, res, next) {
	// Check if the Authorization header is present and properly formatted
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json('Unauthorized.');  // Unauthorized response
  }
  const token = req.headers.authorization.split(' ')[1];
  // Verify the token
  try {
    const content = jwt.verify(token, process.env.AUTH_TOKEN_KEY);
    req.data = content;
    next();
  } catch (err) {
    return res.status(401).json('Invalid or expired token.');  // Error response for invalid or expired token
  }
}