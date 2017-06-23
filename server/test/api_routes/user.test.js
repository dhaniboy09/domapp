import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';
import mockData from '../mockData';

const expect = chai.expect;
let	userToken;
chai.use(chaiHttp);

describe('Users', () => {
	after((done) => {
		models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
		done();
	});
	before((done) => {
		chai.request(server)
			.post('/api/users/logIn')
			.send(mockData.User)
			.end((err, res) => {
				userToken = res.body.token;
				done();
			});
	});
	describe('/auth/users', () => {
		it('should create a new user', (done) => {
			chai.request(server).post('/auth/users').send(mockData.SampleUser2).end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.keys(['token', 'newuser']);
				done();
			});
		});
	});
});
