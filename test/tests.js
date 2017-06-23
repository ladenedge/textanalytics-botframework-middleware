var TextAnalytic = require('../index.js');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');
var next = '';

describe('Recieve', function () {
    beforeEach(function () {
        //A Sinon stub replaces the target function, so no need for DI
        this.post = sinon.stub(request, 'post');
        next = sinon.spy();
    });
    afterEach(function () {
        request.post.restore();
        next.reset();
    });
    var config = { apikey: 'foo' };
    it('should export a object', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = typeof ta;
        assert.equal(actual, 'object');
    });

    it('should export an object with a receive function', function () {
        var ta = TextAnalytic(config, (err, rsp) => { })
        var actual = typeof ta.receive;
        assert.equal(actual, 'function');
    });


    it('should call next() if event is null', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        ta.receive(null, next);
        assert(next.called);
    }
    );

    it('should call next() if event.message is undefined', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        ta.receive({}, next);
        assert(next.called);
    });

    it('should call next() if event.message is null', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: null }, next);
        assert(next.called);
    });

    it('should call next() if event.message.text is undefined', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: {} }, next);
        assert(next.called);
    });

    it('should call next() if event.message.text is null', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: { text: null } }, next);
        assert(next.called);
    });

    it('should call next() if event.message.text is entirely whitespace', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: { text: '  ' } }, next);
        assert(next.called);
    });
})