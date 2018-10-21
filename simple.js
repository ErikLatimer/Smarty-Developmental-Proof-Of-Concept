// Required for the inherent communication through the TCP Protocol to use the
// correct protocol and API to communicate with the Lightstreamer Proxy Data Adapter from this file.
const DataAdapter = require('lightstreamer-adapter').DataProvider; // I actually need to check whether I have this thing installed.
// It's installed XD
// Globalizes the net module. The net module is used in this file to create connections to the write and 
// response ports of the proxy data adapters.
const Net = require('net');

const LOCALHOST = 'localhost'; // Specifies that the host is the local machine
const REQUEST_RESPONSE_PORT = 6663; // The port where we will be receiving information from the Proxy Data Adapter
const WRITE_PORT = 6664; // The port where we will be sending data to the Proxy Data Adapter.

// Creates a stream to localhost:6663
const REQUEST_RESPONSE_STREAM = Net.createConnection(REQUEST_RESPONSE_PORT, LOCALHOST);
// Creates a sream to localhost:6664
const WRITE_STREAM = Net.createConnection(WRITE_PORT, LOCALHOST);

// Creates the DataProvider instance. Presumably responsible for communicating and presenting data from the streams.
const DATAPROVIDER = new DataAdapter(REQUEST_RESPONSE_STREAM, WRITE_STREAM);
// The above statement is not semantic. Refer to what the DataAdapter variable actually points to for the statement
// above to be intuitive and self-explanatory.

var timeId;

DATAPROVIDER.on('subscribe', function (itemName, response) {
    timerId = setInterval ( 
        ()=> {
            var somenum = 1000+Math.round(Math.random()*2000);
            DATAPROVIDER.update("someitem", false, { number: somenum } );
        },
        1000
    );
    response.success();
});

DATAPROVIDER.on('unsubscribe', function(itemName, response) {
    console.log("Unsubscribed item: " + itemName);
    response.success();
});
  
