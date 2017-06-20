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
			const endpoint = config.endpoint;
			['/languages', '/keyPhrases', '/sentiment'].forEach(function (item) {
				config.endpoint = endpoint+item;
				var textanalytics = new TextAnalytics(config);
				textanalytics.analyze(event.message.text,
					function (error, resp) {
						if (error) {
							console.log(error);
						}
						else {
							if (resp.documents[0].score) {
								console.log(`Sentiment: ${resp.documents[0].score}; `);
							}
							else if (resp.documents[0].keyPhrases) {
								console.log(`Key Phrases: ${resp.documents[0].keyPhrases}; `);
							}
							else {
								console.log(`Detected Languages: ${resp.documents[0].detectedLanguages[0]}; `);
							}

							
						}

					}
				)
			}
			)
  		next();
		};
			

	}
	return receive;
}

module.exports = textanalytics_botframework_middleware;