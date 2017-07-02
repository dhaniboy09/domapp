import Auth from '../middleware/authentication';

const Document = require('../models').Document;
const Role = require('../models').Role;

const LIMIT = 6;
const OFFSET = 0;

const DocumentController = {
	createDocument: (req, res) => {
		Document.find({ where: { title: req.body.title, userId: req.decoded.user.id } })
			.then((existingDocument) => {
				if (existingDocument) {
					return res.status(403).send({
						message: 'Oops!. You already have a document with this title.',
					});
				}
			});
		const document = {
			title: req.body.title,
			content: req.body.content,
			userId: req.decoded.user.id,
			userRoleId: req.decoded.user.roleId,
			access: req.body.access || 'public'
		};
		Document.create(document)
			.then((createdDocument) => {
				res.status(201).send({
					createdDocument
				});
			})
			.catch(() => {
				res.status(400).send({
					message: 'Could not create document. Pls try later'
				});
			});
	},
	getDocument: (req, res) => {
		const docId = req.params.id;
		const userRole = req.decoded.user.roleId;
		const userId = req.decoded.user.id;
		Document.findById(docId)
			.then((foundDocument) => {
				if (foundDocument) {
					if ((foundDocument.access === 'public' || (userRole === foundDocument.userRoleId)) && foundDocument.access !== 'private') {
						res.status(200).send({
							foundDocument,
						});
					} else if (foundDocument.userId === userId || Auth.isAdmin(userRole)) {
						res.status(200).send({
							foundDocument,
						});
					} else {
						res.status(403).send({
							message: 'Access Denied'
						});
					}
				} else {
					res.status(404).send({
						message: 'Document Not Found'
					});
				}
			})
			.catch(() => {
				res.status(400).send({
					message: 'Bad Request. Please Try Later'
				});
			});
	},
	getAllDocuments: (req, res) => {
		console.log(req.query.offset);
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userRole = req.decoded.user.roleId;
		Role.findById(userRole)
			.then((role) => {
				if (role.roleName === 'admin') {
					Document
						.findAndCountAll({
							limit,
							offset,
							order: [['DESC']]
						})
						.then((documents) => {
							if (!documents) {
								res.status(404).send({
									message: 'Documents Not Found',
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
								message: 'Bad Request. Please Try Later'
							});
						});
				} else {
					Document.findAndCountAll({
						where: {
							$or: [
								{
									access: 'public'
								},
								{
									access: 'role',
									userRoleId: req.decoded.user.roleId
								}
							]
						},
						limit,
						offset,
						order: [['title', 'DESC']]
					}).then((documents) => {
						if (!documents) {
							res.status(404).send({
								message: 'Documents Not Found',
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
					}).catch(() => {
						res.status(400).send({
							message: 'Bad Request. Please Try Later'
						});
					});
				}
			}).catch(() => {
				res.status(400).send({
					message: 'Bad Request. No user Role'
				});
			});
	},
	updateDocument: (req, res) => {
		const userId = req.decoded.user.id;
		const userRole = req.decoded.user.roleId;
		Document.find({ where: { title: req.body.title, userId: req.decoded.user.id } })
			.then((existingDocument) => {
				if (existingDocument) {
					return res.status(403).json({
						message: 'Oops!. You already have a document with this title.',
					});
				}
			});
		Document.findById(req.params.id).then((foundDocument) => {
			if (foundDocument) {
				if (userRole === 1 || userId === foundDocument.userId) {
					const selector = {
						where: { id: req.params.id }
					};
					const updatedDocument = req.body;
					Document.update(req.body, selector).then(() => {
						res.status(200).send(
							updatedDocument
						);
					}).catch((err) => {
						res.status(404).json({ error: err.message });
					});
				} else {
					res.status(403).send({
						message: 'Access Denied'
					});
				}
			} else {
				return res.status(404).json({
					message: 'Document Not Found',
				});
			}
		}).catch((err) => {
			res.status(404).send({
				message: 'Could not find document to update'
			});
		});
	},
	deleteDocument: (req, res) => {
		const userId = req.decoded.user.id;
		const userRole = req.decoded.user.roleId;
		Document.findById(req.params.id).then((foundDocument) => {
			if (foundDocument) {
				if (userRole === 1 || userId === foundDocument.userId) {
					Document.destroy({
						where: {
							id: req.params.id
						}
					})
						.then(() => {
							return res.status(200).json({
								foundDocument
							});
						})
						.catch(() => {
							res.status(500).send({
								message: 'Could not delete. Please Try Later'
							});
						});
				} else {
					return res.status(404).json({
						message: 'Access Denied',
					});
				}
			} else {
				return res.status(404).json({
					message: 'Document Not Found',
				});
			}
		});
	},
	searchDocument: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		if (req.params.searchQuery) {
			Document.findAndCountAll({
				where: {
					$or: [
						{
							title: {
								$iLike: `%${req.params.searchQuery}%`
							}
						},
						{
							content: {
								$iLike: `%${req.params.searchQuery}%`
							}
						},
					]
				},
				order: [['title', 'ASC']],
				limit,
				offset
			})
				.then((foundDocuments) => {
					const pagination = {
						totalCount: foundDocuments.count,
						pages: Math.ceil(foundDocuments.count / limit),
						currentPage: Math.floor(offset / limit) + 1,
						pageSize: foundDocuments.rows.length,
					};
					res.status(200).send({
						documents: foundDocuments.rows,
						pagination,
					});
				})
				.catch((err) => {
					res.status(500).send({
						message: err
					});
				});
		} else {
			res.status(400).send({
				message: 'Item not found'
			});
		}
	}
};
module.exports = DocumentController;
