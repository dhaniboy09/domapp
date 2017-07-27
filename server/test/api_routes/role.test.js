import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';
import mockData from '../mockData';

const expect = chai.expect;
let	userToken, adminToken;
chai.use(chaiHttp);

before((done) => {
	chai.request(server)
		.post('/auth/v1/users/login')
		.send(mockData.Admin)
		.end((err, res) => {
			adminToken = res.body.token;
			done();
		});
});
describe('Roles', () => {
	after((done) => {
		models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
		done();
	});
	describe('POST /api/v1/roles', () => {
		it('should not allow unauthorized creation of roles', (done) => {
			chai.request(server).post('/api/v1/roles').send({ roleName: 'guest' }).end((err, res) => {
				expect(res.status).to.equal(401);
				expect(res.body).to.be.a('object');
				done();
			});
		});
	});
});
