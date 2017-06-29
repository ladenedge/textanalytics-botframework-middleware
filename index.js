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
    return {
        botbuilder: function (session, next) {
            if (!session || session === null) {
                next();
            }
            else if (!session.message || session.message === null) {
                next();
            }
            else if (!session.message.text || session.message.text === null) {
                next();
            }
            else if (session.message.text.trim() === '') {
                next();
            }
            else {               
                var textanalytics = new TextAnalytics(config);
                textanalytics.analyze(session.message.text, function (error, resp) {
                    if (error) {
                        callback(error);
                    }
                    else {
                        var response_summary = { sentiment: resp.sentiment, languages: resp.languages, keyPhrases: resp.keyPhrases };
                        callback(null, response_summary);
                        next();
                    }
                });
            };
        }
    };
}

module.exports = textanalytics_botframework_middleware;