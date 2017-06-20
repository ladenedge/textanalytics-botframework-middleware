var TextAnalytics = require('textanalytics');

/**
 * Module for the Text analytics that creates a Bot Framework-friendly interface
 */

/**
 * A callback to handle both successful and failed requests. 
 * @callback TextAnalytics-botframework-middleware~callback
 * @param {Error} err An Error object containing information about a failure, or null if the call succeeded.
 * @param {string} rsp A string created from the body of the successful response.
 */

/**
 * Serves as a middleware between the textanalytics API and the Bot Framework
 * @param {Object} config Configuration for the module
 * @param {string} config.apikey Full api key for the Text Analytics API
 * @param {function} callback A response handler for when the function completes
 */
var textanalytics_botframework_middleware = function (config, callback) {
    var receive = function (event, next) {
        if (!event || event === null) {
            next();
        }
        else if (!event.message || event.message === null) {
            next();
        }
        else if (!event.message.text || event.message.text === null) {
            next();
        }
        else if (event.message.text.trim() === '') {
            next();
        }
        else {
            var response_summary = '';
            var textanalytics = new TextAnalytics(config);
            textanalytics.analyze(event.message.text, function (error, resp) {
                if (error) {
                    callback(error);
                }
                else {
                    response_summary += `Sentiment score: ${resp.sentiment}, Languages: ${resp.languages}, Key Phrases: ${resp.keyPhrases}`;
                    callback(null, response_summary);
                    next();
                }
            });
        };
    }
    return receive;
}

module.exports = textanalytics_botframework_middleware;