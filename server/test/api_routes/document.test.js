import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';
import mockData from '../mockData';

const expect = chai.expect;
let	userToken, adminToken;
chai.use(chaiHttp);

describe('Documents:-', () => {
	after((done) => {
		models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
		done();
	});
	before((done) => {
		chai.request(server)
			.post('/auth/v1/users/login')
			.send(mockData.User)
			.end((err, res) => {
				userToken = res.body.token;
				done();
			});
	});
	before((done) => {
		chai.request(server)
			.post('/auth/v1/users/login')
			.send(mockData.Admin)
			.end((err, res) => {
				adminToken = res.body.token;
				done();
			});
	});
	describe('POST /api/v1/documents', () => {
		it('should allow authenticated user create a new document', (done) => {
			const newDocument = {
				title: 'Test Document',
				content: 'This is a test document',
				access: 'public',
				userId: 2,
			};
			chai.request(server)
				.post('/api/v1/documents')
				.send(newDocument)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.createdDocument).to.be.a('object');
					expect(res.body.createdDocument).to.have.property('id');
					expect(res.body.createdDocument)
						.to.have.property('title')
						.to.be.equal('test document');
					expect(res.body.createdDocument)
						.to.have.property('content')
						.to.be.equal('This is a test document');
					expect(res.body.createdDocument)
						.to.have.property('access')
						.to.be.equal('public');
					done();
				});
		});
		it('should ensure document titles are unique', (done) => {
			const newDocument = {
				title: 'Test Document',
				content: 'This is a test document',
				access: 'public',
				userId: 2,
			};
			chai.request(server)
				.post('/api/v1/documents')
				.send(newDocument)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body.message)
						.to.eql(
							'You already have a document with this title.'
						);
					done();
				});
		});
		it('should not add a new document if any field is missing', (done) => {
			const newDocument = {
				title: '',
				content: '',
				userId: 2,
			};
			chai.request(server)
				.post('/api/v1/documents')
				.send(newDocument)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(400);
					expect(res.body).to.be.a('object');
					expect(res.body.message).to.eql('Could not create document. Pls try later');
					done();
				});
		});
		it('should not allow a non-authenticated user create documents', (done) => {
			const newDocument = {
				title: 'Test Document',
				content: 'This is a test document',
				access: 'public',
				userId: 2,
			};
			chai.request(server)
				.post('/api/v1/documents')
				.send(newDocument)
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body).to.be.a('object');
					expect(res.body.message).to.eql('Failed to authenticate token.');
					done();
				});
		});
	});
	describe('GET /api/v1/documents/:id', () => {
		it('should allow a user retrieve a single document', (done) => {
			chai.request(server)
				.get('/api/v1/documents/2')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.foundDocument).to.have.property('title');
					expect(res.body.foundDocument.title).to.not.equal(null);
					expect(res.body.foundDocument).to.have.property('content');
					expect(res.body.foundDocument.content).to.not.equal(null);
					expect(res.body.foundDocument).to.have.property('access');
					expect(res.body.foundDocument.access).to.not.equal(null);
					done();
				});
		});
		it('should not allow user retrieve another users private document', (done) => {
			chai.request(server)
				.get('/api/v1/documents/1')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message').to.equal('Access Denied');
					done();
				});
		});
		it('should allow user retrieve their private documents', (done) => {
			chai.request(server)
				.get('/api/v1/documents/1')
				.set({ 'x-access-token': adminToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					done();
				});
		});
		it('should fail to retrieve a non-existing document', (done) => {
			chai.request(server)
				.get('/api/v1/documents/60')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(404);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message').to.equal('Document Not Found');
					done();
				});
		});
		it('should recognize a bad request', (done) => {
			chai.request(server)
				.get('/api/v1/documents/token')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(400);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message').to.equal('Bad Request. Please Try Later');
					done();
				});
		});
	});
	describe('GET /api/v1/documents', () => {
		it('should allow authenticated user retrieve all public/role documents', (done) => {
			chai.request(server)
				.get('/api/v1/documents')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					done();
				});
		});
		it('should allow admin user retrieve all documents', (done) => {
			chai.request(server)
				.get('/api/v1/documents')
				.set({ 'x-access-token': adminToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					done();
				});
		});
		it('should not allow a non-authenticated user retrieve documents', (done) => {
			chai.request(server)
				.get('/api/v1/documents')
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body).to.be.a('object');
					expect(res.body.message).to.eql('Failed to authenticate token.');
					done();
				});
		});
		it('Should get all documents with correct limit as a query', (done) => {
			const limit = 1;
			chai.request(server)
				.get(`/api/v1/documents?limit=${limit}`)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.keys(['documents', 'pagination']);
					expect(res.body.documents).to.have.length(1);
					done();
				});
		});
	});
	describe('PUT /api/v1/documents/:id', () => {
		it('should update a user document', (done) => {
			const id = 2;
			chai.request(server)
				.put(`/api/v1/documents/${id}`)
				.set({ 'x-access-token': userToken })
				.send({ title: 'Hallo' })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					done();
				});
		});
	});
	describe('GET /api/v1/search/documents', () => {
		const params = {
			searchQuery: 'err',
			offset: 0
		};
		it('should allow user search by title ', (done) => {
			chai.request(server)
				.get(`/api/v1/search/documents?query=${params.searchQuery}&offset=${params.offset}`)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.keys(['documents', 'pagination']);
					done();
				});
		});
	});
	describe('DELETE /api/v1/documents/:id', () => {
		it('Should fail to delete a document given the user is not the owner', (done) => {
			const id = 1;
			chai.request(server)
				.delete(`/api/v1/documents/${id}`)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message').to.equal('Access Denied');
					done();
				});
		});
		it('Should fail to delete a non-existing document', (done) => {
			const id = 500;
			chai.request(server)
				.delete(`/api/v1/documents/${id}`)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(404);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message').to.equal('Document Not Found');
					done();
				});
		});
	});
});
