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
    it('should export an object', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = typeof ta;
        assert.equal(actual, 'object');
    });

    it('should export an object with a botbuilder function', function () {
        var ta = middleware(config, (err, rsp) => { })
        var actual = typeof ta.botbuilder;
        assert.equal(actual, 'function');
    });


    it('should call next() if session is null', function () {
        var ta = middleware(config, (err, rsp) => { });
        ta.botbuilder(null, next);
        assert(next.called);
    }
    );

    it('should call next() if session.message is undefined', function () {
        var ta = middleware(config, (err, rsp) => { });
        ta.botbuilder({}, next);
        assert(next.called);
    });

    it('should call next() if session.message is null', function () {
        var ta = middleware(config, (err, rsp) => { });
        ta.botbuilder({ message: null }, next);
        assert(next.called);
    })

    it('should call next() if session.message.text is undefined', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = ta.botbuilder({ message: {}}, next);
        assert(next.called);
    });

    it('should call next() if session.message.text is null', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = ta.botbuilder({message:{ text: null }}, next);
        assert(next.called);
    });

    it('should call next() if session.message.text is entirely whitespace', function () {
        var ta = middleware(config, (err, rsp) => { });
        var actual = ta.botbuilder({ message: { text: '  ' } }, next);
        assert(next.called);
    });

    it('should pass the errors from the analyze function to the callback function', function (done) {
        this.analyze.callsArgWith(1, new Error('Test Error'));
        var receive = middleware(config, (err, rsp) => {
            assert.equal(err.message, 'Test Error');
            done();
        }).botbuilder;
        receive({ message: { text: 'Hello' } }, () => { });
    });

    it('should pass along the response summary if no error occurs', function (done) {
        this.analyze.callsArgWith(1, null, { sentiment: 1, languages: 2, keyPhrases: 3 });
        var receive = middleware(config, (err, rsp) => {
            assert.equal(rsp.sentiment, 1);
            done();
        }).botbuilder;
        receive({ message: { text: 'Hello' } }, () => { });
    });
})