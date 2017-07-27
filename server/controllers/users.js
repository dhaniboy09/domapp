import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validateInput from '../helpers/signUpValidation';

require('dotenv').config();
const User = require('../models').User;
const Document = require('../models').Document;

const defaultRole = 2;
const LIMIT = 6;
const OFFSET = 0;

const UserController = {
	/**
	 * Handles POST /auth/users/login Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	logIn: (req, res) => {
		if (req.body.email && req.body.password) {
			User.findOne({ where: { email: req.body.email } })
				.then((user) => {
					if (user) {
						bcrypt.compare(req.body.password, user.dataValues.password, (err, match) => {
							const token = jwt.sign(
								{
									id: user.dataValues.id,
									firstName: user.dataValues.firstName,
									lastName: user.dataValues.lastName,
									email: user.dataValues.email,
									roleId: user.dataValues.roleId
								},
								process.env.SECRET_KEY,
								{ expiresIn: '23h' }
							);
							if (match) {
								res.send(200, {
									token
								});
							} else {
								res.status(401).json({ error: 'Invalid Credentials' });
							}
						});
					} else {
						res.status(401).json({ error: 'User not found' });
					}
				}).catch((err) => {
					res.status(500).json({ error: err.message });
				});
		} else {
			res.status(400).json({ error: 'Bad Request' });
		}
	},
	/**
	 * Handles POST /auth/users/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	createUser: (req, res) => {
		const { errors, isValid } = validateInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		User.findOne({ where: { email: req.body.email } })
			.then((user) => {
				if (!user) {
					if (req.body.roleId === 1 || req.body.roleId > 2) {
						return res.status(403).json('Role cannot be directly assigned!');
					}
					User.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: req.body.password,
						roleId: req.body.roleId || defaultRole
					}).then((newuser) => {
						const token = jwt.sign(
							{
								id: newuser.dataValues.id,
								firstName: newuser.dataValues.firstName,
								lastName: newuser.dataValues.lastName,
								email: newuser.dataValues.email,
								roleId: newuser.dataValues.roleId
							},
							process.env.SECRET_KEY,
							{ expiresIn: '23h' });
						res.send(200, {
							token
						});
					}).catch((err) => {
						res.status(400).json({ error: err.message });
					});
				} else {
					return res.status(403).json({
						message: 'User already exists!',
					});
				}
			}).catch((err) => {
				res.status(401).json({ error: err.message });
			});
	},
	/**
	 * Handles GET /api/users/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getUser: (req, res) => {
		User.findOne({ where: { id: req.params.id } }).then((user) => {
			if (user) {
				return res.status(200).json(user);
			} else {
				return res.status(404).json({
					message: 'User Not Found',
				});
			}
		}).catch((err) => {
			res.status(404).json({ error: err.message });
		});
	},
	/**
	 * Handles GET /api/users/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getAllUsers: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userRole = req.decoded.roleId;
		if (userRole === 1) {
			User
				.findAndCountAll({
					limit,
					offset,
					order: [['createdAt', 'DESC']]
				})
				.then((users) => {
					if (!users) {
						res.status(404).send({
							message: 'Users Not Found',
						});
					}
					const pagination = {
						totalCount: users.count,
						pages: Math.ceil(users.count / limit),
						currentPage: Math.floor(offset / limit) + 1,
						pageSize: users.rows.length,
					};
					res.status(200).send({
						users: users.rows,
						pagination,
					});
				})
				.catch((err) => {
					res.status(400).send(err);
				});
		} else {
			res.status(403).json('Access Denied!');
		}
	},
	/**
	 * Handles PUT /api/users/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	updateUser: (req, res) => {
		const userId = req.decoded.id;
		User.findById(req.params.id).then((user) => {
			if (!user) {
				return res.status(404).json({
					message: 'User Not Found',
				});
			}
			if (userId === Number(req.params.id)) {
				if (req.body.email) {
					if (req.body.email === req.decoded.email) {
						return user.update({
							firstName: req.body.firstName || user.firstName,
							lastName: req.body.lastName || user.lastName,
							email: req.body.email || user.email,
							password: user.password,
							roleId: req.body.roleId || user.roleId
						})
							.then(() => res.status(200).send(user))
							.catch(error => res.status(400).send(error));
					}
					User.find({ where: { email: req.body.email }
					}).then((foundEmail) => {
						if (foundEmail) {
							return res.status(403).json({
								message: 'Email already in use'
							});
						}
						user.update({
							firstName: req.body.firstName || user.firstName,
							lastName: req.body.lastName || user.lastName,
							email: req.body.email || user.email,
							password: user.password,
							roleId: req.body.roleId || user.roleId
						})
							.then(() => res.status(200).send(user))
							.catch(error => res.status(400).send(error));
					});
				} else {
					user.update({
						firstName: req.body.firstName || user.firstName,
						lastName: req.body.lastName || user.lastName,
						email: req.body.email || user.email,
						password: user.password,
						roleId: req.body.roleId || user.roleId
					})
						.then(() => res.status(200).send(user))
						.catch(error => res.status(400).send(error));
				}
			}
		}).catch((err) => {
			res.status(404).json({ error: err.message });
		});
	},
	updatePassword(req, res) {
		const userId = req.decoded.id;
		if (userId === Number(req.params.id)) {
			User.findById(req.params.id).then((user) => {
				if (!user) {
					return res.status(404).json({
						message: 'User Not Found',
					});
				}
			});
			User.update(
				{ password: req.body.password },
				{ where: { id: req.params.id } }
			).then((user) => {
				res.status(200).json(user);
			}).catch((err) => {
				res.status(404).json({ error: err.message });
			});
		}
	},
	/**
	 * Handles DELETE /api/users/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	deleteUser(req, res) {
		const userId = req.decoded.id;
		const userRole = req.decoded.roleId;
		if (userRole === 1 || userId === Number(req.params.id)) {
			User.findById(req.params.id).then((user) => {
				if (!user) {
					return res.status(404).json({
						message: 'User Not Found',
					});
				} else {
				User.destroy({
					where: {
						id: req.params.id
					}
				})
					.then(() => {
						res.status(204).json({
							message: 'Account Deleted'
						});
					})
					.catch((err) => {
						res.status(500).json({ error: err.message });
					});
				}
			}).catch((err) => {
				res.status(500).json({ error: err.message });
			});
		} else {
			return res.status(403).json({
				message: 'Cannot delete user',
			});
		}
	},
	/**
	 * Handles GET /api/search/users/:searchQuery Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	searchUsers: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userRole = req.decoded.roleId;
		if (req.query.query) {
			if (userRole === 1) {
				User.findAndCountAll({
					where: {
						$or: [
							{
								firstName: {
									$iLike: `%${req.query.query}%`
								}
							},
							{
								lastName: {
									$iLike: `%${req.query.query}%`
								}
							},
						]
					},
					order: [['createdAt', 'DESC']],
					limit,
					offset
				})
					.then((user) => {
						const pagination = {
							totalCount: user.count,
							pages: Math.ceil(user.count / limit),
							currentPage: Math.floor(offset / limit) + 1,
							pageSize: user.rows.length,
						};
						res.status(200).send({
							users: user.rows,
							pagination,
						});
					})
					.catch((err) => {
						res.status(500).json({ error: err.message });
					});
			} else {
				res.status(403).json({ error: 'You do not have access' });
			}
		} else {
			res.status(400).json({ error: 'Search query not found' });
		}
	},
	/**
	 * Handles POST /auth/users/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getUserDocuments: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userId = req.decoded.id;
		if (userId !== Number(req.params.id)) {
			return res.status(401).json({
				message: 'Wrong Move',
			});
		}
		Document
			.findAndCountAll({
				where: {
					userId: req.params.id,
				},
				order: [['createdAt', 'DESC']],
				limit,
				offset
			})
			.then((documents) => {
				if (!documents) {
					res.status(404).send({
						message: 'Document Not Found',
					});
				}
				const pagination = {
					totalCount: documents.count,
					pages: Math.ceil(documents.count / limit),
					currentPage: Math.floor(offset / limit) + 1,
					pageSize: documents.rows.length,
				};
				res.status(200).send({
					documents: documents.rows,
					pagination,
				});
			})
			.catch(() => {
				res.status(400).send({
					message: 'Bad Request. Please Try Again',
				});
			});
	}
};

module.exports = UserController;
