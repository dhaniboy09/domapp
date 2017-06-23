import Auth from '../middleware/authentication';

const Document = require('../models').Document;


const LIMIT = 5;
const OFFSET = 0;

const DocumentController = {
	createDocument: (req, res) => {
		Document.findOne({ where: { title: req.body.title } })
			.then((existingDocument) => {
				if (!existingDocument) {
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
						.catch((err) => {
							res.status(400).send(err);
						});
				} else {
					res.status(404).json('Document already exists!');
				}
			}).catch((err) => {
				res.status(401).json({ error: err.message });
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
						console('Im up');
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
			.catch((err) => {
				res.status(400).send(err);
			});
	},
	getAllDocuments: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		Document
			.findAndCountAll({
				order: '"createdAt" DESC',
				limit,
				offset
			})
			.then((documents) => {
				if (!documents) {
					res.status(404).send({
						message: 'Documents Not Found',
					});
				}
				const pagination = limit && offset ? {
					totalCount: documents.count,
					pages: Math.ceil(documents.count / limit),
					currentPage: Math.floor(offset / limit) + 1,
					pageSize: documents.rows.length,
				} : null;
				res.status(200).send({
					documents: documents.rows,
					pagination,
				});
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	},
	updateDocument: (req, res) => {
		const userId = req.decoded.user.id;
		const userRole = req.decoded.user.roleId;
		Document.findAll({ where: { title: req.body.title } }).then((existingDocument) => {
			if (existingDocument) {
				return res.status(403).json({
					message: 'Title already exists. Title must be unique.',
				});
			}
		});
		Document.findById(req.params.id).then((foundDocument) => {
			if (foundDocument) {
				if (userRole === 1 || userId === foundDocument.userId) {
					const selector = {
						where: { id: req.params.id }
					};
					Document.update(req.body, selector).then(() => {
						res.status(200).json({
							message: 'Document Updated'
						});
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
			res.status(404).json({ error: err.message });
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
								message: 'Document Deleted'
							});
						})
						.catch((err) => {
							res.status(500).json({ error: err.message });
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
				order: [['createdAt', 'DESC']],
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
					res.status(500).json({ error: err.message });
				});
		} else {
			res.status(400).json({ error: 'Item not found' });
		}
	}
};
module.exports = DocumentController;
