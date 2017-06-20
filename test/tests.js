var TextAnalytic = require('textanalytics');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');

describe('Recieve', function () {
    beforeEach(function () {
        //A Sinon stub replaces the target function, so no need for DI
        this.post = sinon.stub(request, 'post');
    });
    afterEach(function () {
        request.post.restore();
    });
    var config = { endpoint: 'foo', apikey: 'bar' };
    it('should export a function', function () {        
        assert.equal(typeof new TextAnalytic(config, (err,rsp) => { }), 'function');
    });

    it('should call next when event is null', function(){
        assert.equal(new TextAnalytic(config, (err, rsp) => { })(null, function () { return 'test'; }), 'test');
    });
})