"use strict";

var _errorHandling = require("../../../experimental_output/errorHandling.js");

Error.prepareStackTrace = _errorHandling.prepStackTrace;
var testError = new Error();
console.log("Here is the stack trace:\n".concat(testError.stack));