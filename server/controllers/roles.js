const Role = require('../models').Role;

const RoleController = {
	/**
	 * Handles POST /api/roles Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
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
