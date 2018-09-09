const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review.js');

chai.use(chaiHttp);

describe('Reviews', () => {

    // TEST INDEX
    it('should index ALL reviews on /GET', (done) => {
        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW
    // TEST CREATE
    // TEST SHOW
    // TEST EDIT
    // TEST UPDATE
    // TEST DELETE
});

module.review = server; 
