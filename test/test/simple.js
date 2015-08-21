var Lab = require('lab');
var Code = require('code');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('simple', function () {

    it('returns true when 1 + 1 equals 2', function (done) {

        expect(1 + 1).to.equal(2);
        done();
    });
});
