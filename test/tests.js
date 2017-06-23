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
        var actual = ta.receive(null, () => { return 2; });
        assert.equal(actual, 2);
    }
    );

    it('should call next() if event.message is undefined', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({}, () => { return 2; });
        assert.equal(actual, 2);
    });

    it('should call next() if event.message is null', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: null }, () => { return 2; });
        assert.equal(actual, 2);
    });

    it('should call next() if event.message.text is undefined', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.recieve({ message: {} }, () => { return 2; });
        assert.equal(actual, 2);
    });

    it('should call next() if event.message.text is null', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: { text: null } }, () => { return 2; });
        assert.equal(actual, 2);
    });

    it('should call next() if event.message.text is entirely whitespace', function () {
        var ta = TextAnalytic(config, (err, rsp) => { });
        var actual = ta.receive({ message: { text: '  ' } }, () => { return 2; });
        assert.equal(actual, 2);
    });
})