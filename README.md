# Text Analytics API Bot Framework Middleware Module


This is a Node module to provide the Text Analytics API Proxy with a
Bot Framework-friendly interface so that it can be easily inserted into the Bot Framework
communication flow

## Installation

Install the module from [NPM](https://www.npmjs.com/package/textanalytics-botframework-middleware)
	
	npm install textanalytics-botframework-middleware

# Usage

Including the module in the source defines the textanalytics_botframework_middleware function. 
The function takes a config object as arguments and returns a recieve function. 
	var receive = require('textanalytics-botframework-middleware')(config);

##Full Example

	var config = {
		apikey: process.env.TEXTANALYTICS_APIKEY,
	};

	var textanalytics = require('textanalytics-botframework-middleware')(config);
	bot.use(textanalytics);

## License

This module is licensed under the [MIT License](https://opensource.org/licenses/MIT).
Copyright &copy; 2017, Verint Inc.
