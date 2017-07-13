const Role = require('../models').Role;

const RoleController = {
	createRole: (req, res) => {
		Role.create({
			roleName: req.body.roleName
		})
			.then((role) => {
				res.status(201).json(role);
			})
			.catch((err) => {
				res.status(500).json({ error: err.message });
			});
	}
};
module.exports = RoleController;
