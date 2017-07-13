import Auth from '../middleware/authentication';

const Document = require('../models').Document;
const Role = require('../models').Role;

const LIMIT = 6;
const OFFSET = 0;

const DocumentController = {
/**
 	* Route: POST: /documents
 	* @param  {object} req [request object parameter]
 	* @param  {object} res [response object paramter]
 	* @return {void}    returns a response object
 	*/
	createDocument: (req, res) => {
		Document.find({ where: { title: req.body.title, userId: req.decoded.id } })
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
			userId: req.decoded.id,
			userRoleId: req.decoded.roleId,
			access: req.body.access || 'public'
		};
		Document.create(document)
			.then((createdDocument) => {
				res.status(200).send({
					createdDocument
				});
			})
			.catch(() => {
				res.status(400).send({
					message: 'Could not create document. Pls try later'
				});
			});
	},
	/**
	 * Handles GET /api/document/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getDocument: (req, res) => {
		const docId = req.params.id;
		const userRole = req.decoded.roleId;
		const userId = req.decoded.id;
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
	/**
	 * Handles GET /api/documents/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getAllDocuments: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userRole = req.decoded.roleId;
		Role.findById(userRole)
			.then((role) => {
				if (role.roleName === 'admin') {
					Document
						.findAndCountAll({
							limit,
							offset,
							order: [['createdAt', 'DESC']]
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
								message: 'Bad Request1. Please Try Later'
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
									userRoleId: req.decoded.roleId
								}
							]
						},
						limit,
						offset,
						order: [['createdAt', 'DESC']]
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
							message: 'Bad Request2. Please Try Later'
						});
					});
				}
			}).catch(() => {
				res.status(400).send({
					message: 'Bad Request3. No user Role'
				});
			});
	},
	/**
	 * Handles PUT /document/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	updateDocument: (req, res) => {
		const userId = req.decoded.id;
		const userRole = req.decoded.roleId;
		Document.find({ where: { title: req.body.title, userId: req.decoded.id } })
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
					return foundDocument.update({
						title: req.body.title || foundDocument.title,
						content: req.body.content || foundDocument.content,
						access: req.body.access || foundDocument.access,
						userRoleId: foundDocument.userRoleId,
						userId: foundDocument.userId
					})
						.then(() => res.status(200).send(foundDocument))
						.catch(error => res.status(400).send(error));
				}
				res.status(403).send({
					message: 'Access Denied'
				});
			} else {
				return res.status(404).json({
					message: 'Document Not Found',
				});
			}
		}).catch(() => {
			res.status(404).send({
				message: 'Could not find document to update'
			});
		});
	},
	/**
	 * Handles DELETE /document/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	deleteDocument: (req, res) => {
		const userId = req.decoded.id;
		const userRole = req.decoded.roleId;
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
					return res.status(403).json({
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
	/**
	 * Handles GET /api/users/:id/documents Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
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
				.catch(() => {
					res.status(500).send({
						message: 'Document Not Found'
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
