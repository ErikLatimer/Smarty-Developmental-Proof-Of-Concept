import { os } from 'os';
//const os = require('os');

export class deviceInformation {
    static isDesktop() {
        const NONMOBILECPUMODELNAMES = ['Intel(R) Core(TM)', 'AMD'];
        // Get processor information
        var processor = os.cpus();
        // Retrieve the processor names of all the cores within the cpu and compile them into an array.
        var coreModelNames = [];
        // os.cpus() retrieves core objects and returns these core objects into an array.
        // .model is just a field within these core objects that provide a name to these cores.
        var desktop = false;
        // We use the forEach method on tehe array here because its reliable to retrieve whats inside the array, and the forEach method of an array is synchronous.
        processor.forEach( (logicalCoreObject) => {
            console.log( `logicalCoreObject.model:${logicalCoreObject.model}`)
            coreModelNames.push( logicalCoreObject.model );
        });
        // If the core names of the cpu do not contain Intel(R) Core or AMD,  then it must be
        // a low-powered.
        
        // For each of the core names in the coreNames array...
        console.log( "These names came from the contents of the result of running the .model method on each of the core objects listed above.")
        coreModelNames.forEach( ( coreModelName ) => {
            // And then loop through all the known desktop core names...
            NONMOBILECPUMODELNAMES.forEach( ( nonMobileCPUModelName ) => {
                // If JUST ONE OF ANY of the core names equal ANY nonMobileCPU name, then it is a desktop.
                if ( coreModelName.includes( nonMobileCPUModelName) ) {
                    desktop = true;
                }
            } )
        } );
        return desktop;  
    }
}
