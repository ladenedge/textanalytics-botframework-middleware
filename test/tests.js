var TextAnalytic = require('../index.js');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');
var config = { apikey: 'foo' };
var text = require('textanalytics');
var textanalytic = new text(config);

describe('Recieve', function () {

    beforeEach(function () {
        //A Sinon stub replaces the target function, so no need for DI
        this.analyze = sinon.stub(textanalytic, 'analyze');
    });
    afterEach(function () {
        textanalytic.analyze.restore();
    });
    it('should export a object', function () {
        assert.equal(typeof TextAnalytic(config, (err, rsp) => { }), 'object');
    });

    it('should export an object with a receive function', function () {
        assert.equal(typeof TextAnalytic(config, (err, rsp) => { }).receive, 'function');
    });


    it('should call next() if event is null', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { }).receive(null, () => { return 2; }), 2);
    }
    );

    it('should call next() if event.message is undefined', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { }).receive({}, () => { return 2; }), 2)
    });

    it('should call next() if event.message is null', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { }).receive({ message: null }, () => { return 2; }), 2)
    });

    it('should call next() if event.message.text is undefined', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { }).receive({ message: {} }, () => { return 2; }), 2)
    });

    it('should call next() if event.message.text is null', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { }).receive({ message: {text:null} }, () => { return 2; }), 2)
    });

    it('should call next() if event.message.text is entirely whitespace', function () {
        assert.equal(TextAnalytic(config, (err, rsp) => { }).receive({ message: { text: '  ' } }, () => { return 2; }), 2)
    });

    it('should pass the errors from the analyze function to the callback function', function (done) {
        this.analyze.callsArgWith(1, new Error('Test Error'));
        var receive = TextAnalytic(config, (err, rsp) => {
            assert.equal(err.message, 'Test Error');
            done();
        }).receive;
        receive({ message: { text: 'Hello' } }, () => {});
    });
})