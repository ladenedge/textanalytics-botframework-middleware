var TextAnalytic = require('../middleware.js');
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
        assert.equal(typeof TextAnalytic(config), 'function');
    });

    it('should call next when event is null', function(){
        assert.equal(TextAnalytic(config)(null, function () { return 'test'; }), 'test');
    });
})