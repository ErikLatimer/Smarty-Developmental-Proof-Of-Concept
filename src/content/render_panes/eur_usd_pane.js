var React = require('react');
// The reason we need react is because when the babel 
// processor comes through this file, it's going to
// convert all the JSX to React.createElement() calls.
// However these calls won't be valid if their is no
// react module linked.

// I think were not going to do an actual class, but just export a method, that returns JSX.
// Actually we are going to do an actual class becuase we're going to need a init() function because
// the Highcharts charting library that we atre using is in JavaScript and inits in JavaScript to an 
// INITIAL container that is supposed to be already present. 


export class eur_usd_pane {
    constructor ( parentContainerHTMLElementObject ){
        this.container = parentContainerHTMLElementObject;
    }


    
}