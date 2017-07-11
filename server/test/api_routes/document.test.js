import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';
import mockData from '../mockData';

const expect = chai.expect;
const should = chai.should();
let	userToken, adminToken;
chai.use(chaiHttp);

describe('Documents', () => {
	after((done) => {
		models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
		done();
	});
	before((done) => {
		chai.request(server)
			.post('/auth/users/login')
			.send(mockData.User)
			.end((err, res) => {
				userToken = res.body.token;
				done();
			});
	});
	before((done) => {
		chai.request(server)
			.post('/auth/users/login')
			.send(mockData.Admin)
			.end((err, res) => {
				adminToken = res.body.token;
				done();
			});
	});
	describe('POST /api/documents', () => {
		it('should allow authenticated user create a new document', (done) => {
			const newDocument = {
				title: 'Test Document',
				content: 'This is a test document',
				value: 'public',
				userId: 2,
			};
			chai.request(server)
				.post('/api/documents')
				.send(newDocument)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.createdDocument).to.be.a('object');
					expect(res.body.createdDocument).to.have.property('id');
					expect(res.body.createdDocument).to.have.property('title').to.be.equal('Test Document');
					expect(res.body.createdDocument).to.have.property('content').to.be.equal('This is a test document');
					expect(res.body.createdDocument).to.have.property('access').to.be.equal('public');
					done();
				});
		});
		it('should not ensure document titles are unique', (done) => {
			const newDocument = {
				title: 'Test Document',
				content: 'This is a test document',
				value: 'public',
				userId: 2,
			};
			chai.request(server)
				.post('/api/documents')
				.send(newDocument)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body.message).to.eql('Oops!. You already have a document with this title.');
					done();
				});
		});
	});
	describe('POST /api/documents/:id', () => {
		it('should allow user retrieve a single document', (done) => {
			const newDocument = {
				title: 'Test Document',
				content: 'This is a test document',
				value: 'public',
				userId: 2,
			};
			chai.request(server)
				.post('/api/documents')
				.send(newDocument)
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body.message).to.eql('Oops!. You already have a document with this title.');
					done();
				});
		});
	});
});
