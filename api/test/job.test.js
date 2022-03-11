const chaiHttp = require('chai-http');
const app = require('../../app');
const chai = require('chai')
chai.use(chaiHttp);
let should = chai.should();

describe('Jobs', function () {
    describe('/GET Jobs', function () {
        it('should should retreive jobs with pagination', (done)=> {
            chai.request(app)
            .get('/api/v1/jobs')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.jobs.should.be.a('array');
                  res.body.jobs.length.should.be.eq(5);
              done();
            });
        });
    });
});