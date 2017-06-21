import jwt from 'jsonwebtoken';

require('dotenv').config();

module.exports = {

	isAuthenticated: (req, res, next) => {
		const token = req.headers['x-access-token'];
		if (req.url.startsWith('/auth')) return next();
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	},
	isAdmin: (roleId) => {
		return Number(roleId) === 1;
	}
};
