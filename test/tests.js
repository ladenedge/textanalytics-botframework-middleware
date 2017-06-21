var TextAnalytic = require('../index.js');
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
        assert.equal(typeof TextAnalytic(config, (err, rsp) => { }), 'function');
    });

    it('should call next() if event is null', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { })(null, () => { return 2; }), 2);
    }
    );

    it('should call next() if event.message is undefined', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { })({}, () => { return 2; }), 2)
    });

    it('should call next() if event.message is null', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { })({ message: null }, () => { return 2; }), 2)
    });

    it('should call next() if event.message.text is undefined', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { })({ message: {} }, () => { return 2; }), 2)
    });

    it('should call next() if event.message.text is null', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { })({ message: {text:null} }, () => { return 2; }), 2)
    });

    it('should call next() if event.message.text is entirely whitespace', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { })({ message: { text: '   ' } }, () => { return 2; }), 2)
    });
})