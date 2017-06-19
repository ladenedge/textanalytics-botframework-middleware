var TextAnalytics = require('textanalytics')

/**
 * Module for the Text analytics that creates a Bot Framework-friendly interface
 */


/**
 * Serves as a middleware between the textanalytics API and the Bot Framework
 * @param {Object} config Configuration for the module
 * @param {string} config.endpoint Full endpoint for the Text Analytics API
 * @param {string} config.apikey Full api key for the Text Analytics API
 */
var textanalytics_botframework_middleware = function (config) {
	var textanalytics = new TextAnalytics(config);
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
			textanalytics.analyze(event.message.text, 
				function (error,resp) {
					if(error){
						console.log(error);
					}
					else{						
						var response_summary = `Sentiment score: ${resp[0][0].score}, /n Detected language: ${resp[1][0].detectedLanguages}, /n Key phrases: ${resp[2][0].keyPhrases}`;
						console.log(response_summary);
						next();
					}
						
				}
			)};

	}
	return receive;
}

module.exports = textanalytics_botframework_middleware;