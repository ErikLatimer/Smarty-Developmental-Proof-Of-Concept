import { StringBuilder } from 'string-builder';
import { lightstreamerClient } from './lightstreamer_Client';
// We will ust he string-builder npm package module to constructour stings.
Error.prepareStackTrace = prepStackTrace;

// Returns a string with the function name and named parameters as if it were declared from the function specified in functionObject.
function getFunctionDefinitionAsString( functionObject ) {
    var functionSource = functionObject.toString();
    return ( functionSource.substring( 0, ( functionSource.indexOf( '{' ) + 1 ) ) );
}

/**
 * Utilizes the arguments field of the function object to construct a string out of the argument values passed to the function specified in functionObject at runtime.
 * */
function getPassedArgumentsAsString( functionObject ) {
    var argumentsString = new StringBuilder();
    /**
     * Loop through all of the arguments through the VERY SPARISLY supported arguments field of a function object, and get the values of the arguemnts and construct a string
     * from them.
     * */ 
    var argumentsArray = functionObject.arguments;
    for ( var i = 0; i < argumentsArray.length; ++i ) {
        // If this argument is the last argument, we don't and shouldn't put a comma after it's value, becuase there are no more arguments to proceed it.
        ( i != ( argumentsArray.length - 1 ) ) ? argumentsString.append( argumentsArray[i] + " ," ) : argumentsString.append( arguemntsArray[i] );
    }
    // Return the constructed argument string.
    return argumentsString;
}



function prepStackTrace( error, structuredStackTrace ) {
    // The first element of structuredStackTrace is where you actually made a new instance of that error object, or in other words, where you phsyically THREW the error.
    
    // I want to append an args field to the callSiteObject.
    // I also want to append a toSource() field to the callSiteObject.

    var curatedCallSiteArray = [];

    // Follows the structuredStackTrace until it hits the file location module.js, because module.js probably wasn't the cause of the error being thrown.
    for ( var i = ( structuredStackTrace.length - 1 ); i > -1; --i ) {
        /**
         * If we have reached the file called module.js, we do not need information on that file, or any file deeper in the stack trace, so we can break out of the loop
         * and return the callSite object array we have constructed so far.
         * */
        if ( structuredStackTrace[i].getFileName() == 'module.js' ) { continue; }
        var relativeFunction = structuredStackTrace[i].getFunction();
        structuredStackTrace[i].passedArgumentsAsString = getPassedArgumentsAsString( realtiveFunction );
        structuredStackTrace[i].functionDefinitionAsString = getFunctionDefinitionAsString( realtiveFunction );
    }
    return curatedCallSiteArray;

}

function handleErrorVerbose ( error, additionalMessage ) {
    var callSiteArray = error.stack;
    var output = new StringBuilder();
    const ATERRORINDEX = 0;
    var atThrownError = callSiteArray[ ATERRORINDEX ];
    var callerFunction = atThrownError.getFunction();
    var preamble = `A(N) "${error.name}" HAS BEEN THROWN WITHIN FILE "${atThrownError.getFileName()}", LINE "${atThrownError.getLineNumber()}", \
        FUNCTION "${atThrownError.functionDefinitionAsString}". THIS METHOD WAS PASSED THE VALUE(S) "${atThrownError.passedArgumentsAsString}".`;
    output.append( preamble );
    for ( var i = 0; i < callSiteArray.length; ++i ) {
        if ( i == ATERRORINDEX ) {
            output.appendLine( "\tThis is where the error was actually thrown and initialized. " );
        }
        else if ( i == ( ATERRORINDEX - 1 ) ) { output.appendLine( "Caller function of the function that threw the error. " ); }
        else { output.appendLine( `\t${i-1} function call(s) in between error. ` ); } // This quite literally means a function IN BETWEEN the error function.

        output.appendLine( `File: "${callSiteArray[i].getFileName()}". Function signature: "${callSiteArray[i].functionDefinitionAsString}". \
            Passed In Arguments: "${callSiteArray[i].passedArgumentsAsString}". Line: "${callSiteArray[i].getLineNumber()}.` );
    }
    return output;
}