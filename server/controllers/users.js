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
	logIn: (req, res) => {
		if (req.body.email && req.body.password) {
			User.findOne({ where: { email: req.body.email } })
				.then((user) => {
					if (user) {
						bcrypt.compare(req.body.password, user.dataValues.password, (err, match) => {
							const userData = {
								id: user.dataValues.id,
								firstName: user.dataValues.firstName,
								lastName: user.dataValues.lastName,
								email: user.dataValues.email,
								roleId: user.dataValues.roleId
							};
							const token = jwt.sign(
								{ user: userData },
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
	createUser: (req, res) => {
		const { errors, isValid } = validateInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		User.findOne({ where: { email: req.body.email } })
			.then((user) => {
				if (!user) {
					User.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: req.body.password,
						roleId: req.body.roleId || defaultRole
					}).then((newuser) => {
						const userData = {
							id: newuser.dataValues.id,
							firstName: newuser.dataValues.firstName,
							lastName: newuser.dataValues.lastName,
							email: newuser.dataValues.email,
							roleId: newuser.dataValues.roleId
						};
						const token = jwt.sign(
							{ user: userData },
							process.env.SECRET_KEY,
							{ expiresIn: '23h' });
						res.send(200, {
							token
						});
					}).catch((err) => {
						res.status(400).json({ error: err.message });
					});
				} else {
					res.status(403).json('User already exists!');
				}
			}).catch((err) => {
				res.status(401).json({ error: err.message });
			});
	},
	getUser: (req, res) => {
		User.findOne({ where: { id: req.params.id } }).then((user) => {
			res.status(200).json(user);
		}).catch((err) => {
			res.status(404).json({ error: err.message });
		});
	},
	getAllUsers: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		User
			.findAndCountAll({
				order: [['createdAt', 'DESC']],
				limit,
				offset
			})
			.then((users) => {
				if (!users) {
					res.status(404).send({
						message: 'User Not Found',
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
	},
	updateUser: (req, res) => {
		const userId = req.decoded.user.id;
		const userRole = req.decoded.user.roleId;
		if (userRole === 1 || userId === Number(req.params.id)) {
			User.findAll({ where: { email: req.body.email } }).then((existingUser) => {
				if (existingUser) {
					return res.status(403).json({
						message: 'Email already in use.',
					});
				}
			});
			User.findById(req.params.id).then((user) => {
				if (!user) {
					return res.status(404).json({
						message: 'User Not Found',
					});
				}
				const selector = {
					where: { id: req.params.id }
				};
				User.update(req.body, selector).then(() => {
					res.status(200).json(user);
				}).catch((err) => {
					res.status(404).json({ error: err.message });
				});
			}).catch((err) => {
				res.status(404).json({ error: err.message });
			});
		}
	},
	deleteUser(req, res) {
		const userId = req.decoded.user.id;
		const userRole = req.decoded.user.roleId;
		if (userRole === 1 || userId === Number(req.params.id)) {
			User.findById(req.params.id).then((user) => {
				if (!user) {
					return res.status(404).json({
						message: 'User Not Found',
					});
				}
			});
			User.destroy({
				where: {
					id: req.params.id
				}
			})
				.then((user) => {
					res.status(200, 'User Deleted').json(user);
				})
				.catch((err) => {
					res.status(500).json({ error: err.message });
				});
		}
	},
	searchUsers: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		if (req.params.searchQuery) {
			User.findAndCountAll({
				where: {
					$or: [
						{
							firstName: {
								$iLike: `%${req.params.searchQuery}%`
							}
						},
						{
							lastName: {
								$iLike: `%${req.params.searchQuery}%`
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
			res.status(400).json({ error: 'Search query not found' });
		}
	},
	getUserDocuments: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
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
			.catch((err) => {
				res.status(400).send(err);
			});
	}
};

module.exports = UserController;
