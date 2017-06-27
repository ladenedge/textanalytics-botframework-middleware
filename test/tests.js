var middleware = require('..');
var assert = require('assert');
var sinon = require('sinon');
var TextAnalytics = require('textanalytics');
var next = '';

describe('Recieve', function () {
    beforeEach(function () {
        //A Sinon stub replaces the target function, so no need for DI
        this.analyze = sinon.stub(TextAnalytics.prototype, 'analyze');
        next = sinon.spy();
    });
    afterEach(function () {
        TextAnalytics.prototype.analyze.restore();
        next.reset();
    });
    var config = { apikey: 'foo' };
    it('should export a object', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = typeof ta;
        assert.equal(actual, 'object');
    });

    it('should export an object with a receive function', function () {
        var ta = middleware(config, (err, rsp) => { })
        var actual = typeof ta.receive;
        assert.equal(actual, 'function');
    });


    it('should call next() if event is null', function () {
        var ta = middleware(config, (err, rsp) => { });
        ta.receive(null, next);
        assert(next.called);
    }
    );


    it('should call next() if event.text is undefined', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = ta.receive({}, next);
        assert(next.called);
    });

    it('should call next() if event.text is null', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = ta.receive({ text: null }, next);
        assert(next.called);
    });

    it('should call next() if event.text is entirely whitespace', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = ta.receive({ text: '  ' }, next);
        assert(next.called);
    });

    it('should pass the errors from the analyze function to the callback function', function (done) {
        this.analyze.callsArgWith(1, new Error('Test Error'));
        var receive = middleware(config, (err, rsp) => {
            assert.equal(err.message, 'Test Error');
            done();
        }).receive;
        receive({ text: 'Hello' }, () => { });
    });

    it('should pass along the response summary if no error occurs', function (done) {
        this.analyze.callsArgWith(1, null, { sentiment: 1, languages: 2, keyPhrases: 3 });
        var receive = middleware(config, (err, rsp) => {
            assert.equal(rsp.sentiment, 1);
            done();
        }).receive;
        receive({  text: 'Hello' }, () => { });
    });
})