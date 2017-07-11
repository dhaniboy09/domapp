import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';
import mockData from '../mockData';

const expect = chai.expect;
const should = chai.should();
let	userToken, adminToken;
chai.use(chaiHttp);

describe('Users', () => {
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
	describe('POST /auth/users', () => {
		it('should create a new user', (done) => {
			chai.request(server).post('/auth/users').send(mockData.SampleUser2).end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.keys(['token']);
				done();
			});
		});
		it('should not duplicate users', (done) => {
			chai.request(server).post('/auth/users').send(mockData.SampleUser2).end((err, res) => {
				expect(res.status).to.equal(403);
				expect(res.body).to.eql('User already exists!');
				done();
			});
		});
		it('should not create an admin user', (done) => {
			chai.request(server).post('/auth/users').send(mockData.SampleAdmin).end((err, res) => {
				expect(res.status).to.equal(403);
				expect(res.body).to.eql('Role cannot be directly assigned!');
				done();
			});
		});
		it('should validate credentials', (done) => {
			chai.request(server).post('/auth/users').send(mockData.SampleInvalidUser).end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.email).to.eql('Email is invalid');
				expect(res.body.firstName).to.eql('First Name is Required');
				expect(res.body.lastName).to.eql('Last Name is Required');
				expect(res.body.password).to.eql('Password must be minimum of 6 characters');
				expect(res.body.passwordConfirm).to.eql('Password Confirmation is Required');
				done();
			});
		});
	});
	describe('POST /auth/users/login', () => {
		it('should log in an existing user', (done) => {
			chai.request(server).post('/auth/users/login').send(mockData.SampleUser2LogIn).end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.keys(['token']);
				done();
			});
		});
		it('should not log in a non-existing user', (done) => {
			chai.request(server).post('/auth/users/login').send(mockData.SampleUser3LogIn).end((err, res) => {
				expect(res.status).to.equal(401);
				expect(res.body).to.be.a('object');
				expect(res.body.error).to.eql('User not found');
				done();
			});
		});
		it('should not log in a user with wrong credentials', (done) => {
			chai.request(server)
				.post('/auth/users/login')
				.send({ email: mockData.SampleUser2LogIn.email, password: '12345' })
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body).to.be.a('object');
					expect(res.body.error).to.eql('Invalid Credentials');
					done();
				});
		});
	});
	describe('POST /api/users/:id', () => {
		it('should return an object with keys and values', (done) => {
			chai.request(server)
				.get('/api/users/2')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.have.property('firstName');
					expect(res.body.firstName).to.not.equal(null);
					expect(res.body).to.have.property('lastName');
					expect(res.body.lastName).to.not.equal(null);
					expect(res.body).to.have.property('email');
					expect(res.body.email).to.not.equal(null);
					done();
				});
		});
	});
	describe('GET /api/users', () => {
		it('should return an object with keys and values', (done) => {
			chai.request(server)
				.get('/api/users')
				.set({ 'x-access-token': adminToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.keys(['users', 'pagination']);
					done();
				});
		});
		it('should not allow non-admin to view all users', (done) => {
			chai.request(server)
				.get('/api/users')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body).to.eql('Access Denied!');
					done();
				});
		});
		it('should deny access for invalid token', (done) => {
			chai.request(server)
				.get('/api/users')
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body.message).to.eql('Failed to authenticate token.');
					done();
				});
		});
	});
	describe('GET /api/users/:id/documents', () => {
		it('should return users documents', (done) => {
			chai.request(server)
				.get('/api/users/2/documents')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.documents[0]).to.have.property('title');
					expect(res.body.documents[0].title).to.not.equal(null);
					expect(res.body.documents[0]).to.have.property('content');
					expect(res.body.documents[0].content).to.not.equal(null);
					expect(res.body.documents[0]).to.have.property('access');
					expect(res.body.documents[0].access).to.not.equal(null);
					done();
				});
		});
		it('should not allow user access another user documents', (done) => {
			chai.request(server)
				.get('/api/users/3/documents')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body.message).to.eql('Wrong Move');
					done();
				});
		});
	});
	describe('PUT /api/users/profile/:id', () => {
		it('should allow user change password', (done) => {
			chai.request(server)
				.put('/api/users/profile/2')
				.set({ 'x-access-token': userToken })
				.send({ password: '123456789' })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					done();
				});
		});
	});
	describe('PUT /api/users/:id', () => {
		it('should allow user update profile', (done) => {
			const id = 2;
			chai.request(server)
				.put(`/api/users/${id}`)
				.set({ 'x-access-token': userToken })
				.send({ firstName: 'Gimli', lastName: 'Dexter', email: 'gdex@yahoo.com' })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('firstName').to.equal('Gimli');
					done();
				});
		});
		it('should not allow user use an existing email', (done) => {
			const id = 2;
			chai.request(server)
				.put(`/api/users/${id}`)
				.set({ 'x-access-token': userToken })
				.send({ firstName: 'Gimli', lastName: 'Dexter', email: 'david@yahoo.com' })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body).to.be.a('object');
					expect(res.body.message).to.eql('Email already in use');
					done();
				});
		});
		it('should throw an error is id is invalid', (done) => {
			chai.request(server)
				.put('/api/users/100')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(404);
					expect(res.body.message).to.eql('User Not Found');
					done();
				});
		});
	});
	describe('DELETE /api/users/:id', () => {
		it('should not delete a non-existing user', (done) => {
			chai.request(server)
				.delete('/api/users/100')
				.set({ 'x-access-token': adminToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body.message).to.eql('Cannot delete user');
					done();
				});
		});
		it('should not allow user delete another users account', (done) => {
			chai.request(server)
				.delete('/api/users/3')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body.message).to.eql('Cannot delete user');
					done();
				});
		});
	});
	describe('GET /api/search/users/:searchQuery', () => {
		it('should not allow non-admin search for users', (done) => {
			chai.request(server)
				.get('/api/search/users/hello')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(403);
					expect(res.body.error).to.eql('You do not have access');
					done();
				});
		});
	});
	describe('GET /api/users/:id/documents', () => {
		it('should not allow a user access another users documents', (done) => {
			chai.request(server)
				.get('/api/users/1/documents')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body.message).to.eql('Wrong Move');
					done();
				});
		});
		it('should return Users documents', (done) => {
			chai.request(server)
				.get('/api/users/2/documents')
				.set({ 'x-access-token': userToken })
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.have.keys(['documents', 'pagination']);
					expect(res.body.pagination).to.have.property('totalCount').to.not.equal(null);
					expect(res.body.pagination).to.have.property('pages').to.not.equal(null);
					expect(res.body.pagination).to.have.property('currentPage').to.not.equal(null);
					expect(res.body.pagination).to.have.property('pageSize').to.not.equal(null);
					expect(res.body.documents[0]).to.have.property('title').to.not.equal(null);
					expect(res.body.documents[0]).to.have.property('content').to.not.equal(null);
					done();
				});
		});
	});
});
