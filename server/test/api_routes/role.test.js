import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';


const expect = chai.expect;
chai.use(chaiHttp);

describe('Roles', () => {
	after((done) => {
		models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
		done();
	});
	describe('POST /api/v1/roles', () => {
		it('should not allow unauthorized creation of roles', (done) => {
			chai.request(server)
				.post('/api/v1/roles')
				.send({ roleName: 'guest' })
				.end((err, res) => {
					expect(res.status).to.equal(401);
					expect(res.body).to.be.a('object');
					done();
				});
		});
	});
});
