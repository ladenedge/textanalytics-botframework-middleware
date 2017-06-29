# Text Analytics API Bot Framework Middleware Module


This is a Node module to provide the Text Analytics API Proxy with a
Bot Framework-friendly interface so that it can be easily inserted into the Bot Framework
communication flow

## Installation

Install the module from [NPM](https://www.npmjs.com/package/textanalytics-botframework-middleware)
	
	npm install textanalytics-botframework-middleware

# Usage

Including the module in the source defines the textanalytics_botframework_middleware function. 
The function takes a config object and a callback function as arguments and returns a botbuilder function. 

	var botbuilder = require('textanalytics-botframework-middleware')(config, callback);

The callback function is passed along to the textanlytics.analyze() function, and is called to handle error
and success conditions:

	var callback = function (err, rsp){ }

Where *rsp* is the body of the (JSON) response in object form, and *err* is an `Error`
object containing information about the failure, or **null** if the call succeeded.

## Full Example

	var config = {
		apikey: process.env.TEXTANALYTICS_APIKEY,
	};

	var callback = function(err, rsp) {
		if(err)
			console.log(err);
		console.log(rsp);
	};

	var textanalytics = require('textanalytics-botframework-middleware')(config, callback);
	bot.use(textanalytics);

## License

This module is licensed under the [MIT License](https://opensource.org/licenses/MIT).
Copyright &copy; 2017, Verint Inc.
