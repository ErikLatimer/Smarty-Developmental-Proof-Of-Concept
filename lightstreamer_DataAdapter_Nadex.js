// TO DO:
// For the production version of this software, we are going to need to replace both proxy data adapters with their
// ROBUST versions, so that way one tiny error and unsync won't cause the whole server, or the client stream to
// fail and quit on the local server or machine.



// Required for the inherent communication through the TCP Protocol to use the
// correct protocol and API to communicate with the Lightstreamer Proxy Data Adapter from this file.
const DataAdapter = require('lightstreamer-adapter').DataProvider; // I actually need to check whether I have this thing installed.
// It's installed XD
// Required for the inherent communication through the TCP Protocol to use the
// correct protocol and API to communicate with the Lightstreamer Proxy MetaData Adapter from this file.
const MetaDataAdapter = require('lightstreamer-adapter').MetadataProvider;
// Globalizes the net module. The net module is used in this file to create connections to the write and 
// response ports of the proxy data adapters.
const Net = require('net');

const fs = require('fs');

// A POSTGRESQL node module
const { Client } = require('pg');

const LOCALHOST = 'localhost'; // Specifies that the host is the local machine
const REQUEST_RESPONSE_PORT = 8001; // The port where we will be receiving information from the Proxy Data Adapter
const WRITE_PORT = 8002; // The port where we will be sending data to the Proxy Data Adapter.
const REQUEST_RESPONSE_META_DATA_PORT = 8003; // The port where we will be sending and recieving data from the Proxy Metadata Adapater

// Creates a stream to localhost:8001
const REQUEST_RESPONSE_STREAM = Net.createConnection(REQUEST_RESPONSE_PORT, LOCALHOST);
// Creates a sream to localhost:8002
const WRITE_STREAM = Net.createConnection(WRITE_PORT, LOCALHOST);

// Creates a stream to localhost:8003
const REQUEST_RESPONSE_MEATA_DATA_STREAM = Net.createConnection(REQUEST_RESPONSE_META_DATA_PORT, LOCALHOST);


// Creates the DataProvider instance. Presumably responsible for communicating and presenting data from the streams.
const DATAPROVIDER = new DataAdapter(REQUEST_RESPONSE_STREAM, WRITE_STREAM);
// The above statement is not semantic. Refer to what the DataAdapter variable actually points to for the statement
// above to be intuitive and self-explanatory.

// Creates the MetaDataProvider instance. Presumably responsible for communicating and presenting data from the stream.
const METADATAPROVIDER = new MetaDataAdapter(REQUEST_RESPONSE_MEATA_DATA_STREAM);

// Settings for the PostgreSql Client
const POSTGRESQLUSER = 'postgres';
const POSTGRESQLUSERPASSWORD = 'T!g31wo1f';
const POSTGRESQLHOST = 'localhost';
const POSTGRESQLDATABASE = 'minimaldb';
const POSTGRESQLPORT = 5432;

//Instantiate a Postgresql client
const POSTGRECLIENT = new Client({
    user: POSTGRESQLUSER,
    password: POSTGRESQLUSERPASSWORD,
    host: POSTGRESQLHOST,
    port: POSTGRESQLPORT,
    database: POSTGRESQLDATABASE
});

// Sense Nadex only provides options for 10 Forex currencies, these are going to be the available Lightstreamer items.
const AVAILABLEITEMS = [
    'USDCAD', 'USDJPY', 'USDCHF', 'EURUSD', 'EURGBP', 'EURJPY', 'AUDUSD', 'AUDJPY', 'GBPUSD', 'GBPJPY'
];

var availableItemsAssociativeArrayTimerIDs = new Map();
populateAvailableItemsAssociativeArray();

// Clients will subscribe to this item, then send messgaes to the metadataadpater to configure their custom stream.
const CUSTOMSTREAMITEMNAME = "customStreamConfiguration";


const DEFAULTTIMEOUT = 1000; // In milliseconds. Controls how often the user recieves potential updates from Lightstreamer.

var customStreamItems = []; // Should be checked in DATAPROVIDER.on( subscribe );
var customStreamItemMap = new Map(); // Used in METADATAPROVIDER and DATAPROVIDER to append and retrieve respectively.


// This variable isn't going to work because this is all one file, and the timerID could be mutated
// if any user subscribes to more then one available item.
// I think it would be better to create a map like I do with custom stream items for the available items.
// var timerID;

function populateAvailableItemsAssociativeArray() {
    AVAILABLEITEMS.forEach((item) => {
        availableItemsAssociativeArrayTimerIDs.set(item, undefined);
    });
}


DATAPROVIDER.on('subscribe', async function (itemName, response) {
    if (AVAILABLEITEMS.includes(itemName)) { // If AVAILABLEITEMS DOES have the itemName subscribed to in it
        var timerID;
        await POSTGRECLIENT.connect();
        timerID = setInterval(function () { dataPublisher(itemName); }, DEFAULTTIMEOUT);
        availableItemsAssociativeArrayTimerIDs.set(itemName, timerID);
        // FUTURE: Users will be able to choose how often they recieve updates from Lightstreamer.
        response.success(); // Directly from the github example this statement.
        console.log("Successfully subscribed to: " + itemName);
        return;
    }
    else if (customStreamItems.includes(itemName)) {
        await POSTGRECLIENT.connect();
        var customStreamItemObject = customStreamItemMap.get(itemName);
        // NOTE: The property of the customStreamItemObject below is hardcoded.
        customStreamItemObject.timerID = setInterval(function () {
            customStream(customStreamItemObject);
        }, DEFAULTTIMEOUT);
        // Check on making sure that a map only can accomodate unique keys.
        response.success();
        console.log("Successfully subscribed to: " + itemName);
        return;
    }
    else if (itemName == CUSTOMSTREAMITEMNAME) {
        response.success();
        console.log("Successfully subscribed to: " + itemName);
        return;
    }
    else {
        var error_message = "ERROR WITHIN THE DATAPROVIDER.on( subscribe... event function. \'" + itemName + "\' does not exist within the available items.";
        console.error(error_message + "Calling response.error() and returning...");
        response.error(error_message); // I don't know if this is a method of this object, but I am assuming so for no good reason for the time being.
        return;
    }
});

// After a few seconds of disconnect from the client, an item will automatically unsubscribe
// itself.
DATAPROVIDER.on('unsubscribe', function (itemName, response) {
    if (customStreamItems.includes(itemName)) {
        clearInterval(customStreamItemMap.get(itemName).timerID);
        customStreamItemMap.get(itemName).unsubscribed = true;
        customStreamItems = customStreamItems.splice(customStreamItems.indexOf(itemName), 1);
        console.log("UNSUBSCIRBED: " + itemName);
        response.success();
    }
    else if (AVAILABLEITEMS.includes(itemName)) {
        clearInterval(availableItemsAssociativeArrayTimerIDs.get(itemName));
        availableItemsAssociativeArrayTimerIDs.set(itemName, undefined);
        console.log("UNSUBSCIRBED: " + itemName);
        response.success();
    }
    else if (itemName == CUSTOMSTREAMITEMNAME) {
        console.log("UNSUBSCIRBED: " + itemName);
        response.success();
    }
    else {
        var error_message = "ERROR WITHIN THE DATAPROVIDER.on( unsubscribe... event function. \'" + itemName + "\' does not exist within the available items.";
        console.error(error_message + "Calling response.error() and returning...");
        response.error(error_message); // I don't know if this is a method of this object, but I am assuming so for no good reason for the time being.
        return;
    };
});

// Please do note that you can only do variable injection within the pg module within only certain clauses 
// within the statement. For example, a variable injection within a FROM clause will not work. It will not
// recognize the variable injection and treat it as a literal. Other clauses will do the same. The SELECT 
// clause and therr VALUES clause are confirmed to work however.

// We have to use the limit keyword here instead of top because PostGreSQL does not support the TOP function.
// According to stack overflow, no current Relational Database supports BOTH of these functions at the same time.
const VALUESAVAILABLEITEMS = [];
function dataPublisher(currencyPairSymbol) {
    var text = `SELECT * FROM \"${currencyPairSymbol}\" ORDER BY timestamp DESC limit 1`;
    var associativeArray = new Array();
    POSTGRECLIENT.query(text, VALUESAVAILABLEITEMS, (error, response) => {
        if (error) {
            console.error("ERROR WITHIN dataPublisher( currencyPairSymbol ) when querying db:\n" + error.stack);
        }
        else {
            associativeArray["price"] = response.rows[0].price.toString();
            associativeArray["bid"] = response.rows[0].bid.toString();
            associativeArray["ask"] = response.rows[0].ask.toString();
            associativeArray["timestamp"] = response.rows[0].timestamp.toString();
            // We will need ot ensure this method doesn't get update if an unsubscribe event rolls through.
            DATAPROVIDER.update(currencyPairSymbol, false, associativeArray); // I have no idea what false stands for.
        }
    });

}

// NOTE:
// The timeStamps returned by 1Forge are EPOCH UNIX. 
// It also seems like the free tier of 1Forge only provides data precise to one second. There
// are no milliseconds accounted for in the timeStamp sadly. This might mean that five
// second trading on Nadex isn't possible for our users without millisecond precise data :(
// This also means we can completely get rid of the millisecond field from out user JSON 
// metadata message and the field we use to parse that in the Date method toUTC().

/**
 * In order to a custom, delayed or in the past data Lightstreamer stream to users,
 * users or clients will send a messgae in JSON indicating what currency ( or possibly currencies. Possibly in a future update )
 * they would like to stream AND far back in time they would like to go AND the delta time differences between data. Then the 
 * server will create a NEW CUSTOM ITEM FOR THAT USER. The custom item will be named and entered as a unique id THAT THE USER SENT.
 * The user will then be able to subscribe to that new item without problem. It will serve the data the the user's specifications sent
 * through the message. There's even an oppurtunity to tier off this priviledge through the top level object of the JSON object
 * that will serve as metadata for the user's stream specifications. The available custom item will be deleted after a set amount of
 * time has passed after unsubscription. I'm thinking along the lines of:
 * {
 *   command: 'CREATE',
 *   user: 'Lboy',
 *   password: 'Sue123',
 *   {
 *     currencyPair: 'EURUSD',
 *     startDate: {
 *        year: 2018,
 *        monthIndex: 9,
 *        day: 12,
 *        hour: 13,
 *        minute: 0,
 *        second: 0
 *     }
 *     timePassPerTick: 1000,
 *     UID: 85d79873bde4a7fc93a4471a8344dda3 // This is and MD5 hash
 *   }
 * }
 */

// NOTE:
// The client has to be subscribed to AN item before thee client can send any messages to the MetaDataAdapter. 
// Not beung subscribed to an item will cause the client's status to be "DISCONNECTED", even though the client
// hadn't called the disconnect() method. Any client with a status of "DISCONNECTED" will recieve and immediate
// ABORT response from the server without even processing the message sent. 

const REQUIREDPROPERTIESCREATE = {
    'currencyPair': undefined,
    'startDate': ['year', 'monthIndex', 'day', 'hour', 'minute', 'second'],
    'timePassPerTick': undefined,
    'UID': undefined
};
const REQUIREDPROPERTIESPAUSE = {
    'UID': undefined,
}
var requiredkeys;
const REQUIREDCOMMANDPROPERTY = 'command';

// The request object has these keys within it:
// id,verb,userName,sessionId,userMessage
METADATAPROVIDER.on('notifyUserMessage', function (request, response) {
    console.log(`MESSAGE RECIEVED: \"${request.userMessage}\"`);
    var json = request.userMessage;
    try { json = JSON.parse(json); }
    catch (error) {
        var error_message = ("ERROR WITHIN METADATAPROVIDER.on( notifyUserMessage, ... , the message presented from the client was not in parsable JSON format. Stack:\n" + error.stack);
        console.error(error_message + "\nReturning and calling response.error()...");
        response.error(error_message);
        return;
    }
    var keysInObject = Object.keys(json);
    if (!(keysInObject.includes(REQUIREDCOMMANDPROPERTY))) {
        var error_message = ("ERROR WITHIN METADATAPROVIDER.on( notifyUserMessage, ... , the command property of the JSON message sent by the user is either not present or is undefined.");
        console.error(error_message + "\nReturning and calling response.error()...");
        response.error(error_message);
        return;
    }




    if (json.command == 'CREATE') {
        requiredkeys = Object.keys(REQUIREDPROPERTIESCREATE);
        requiredkeys.forEach((key) => {
            if (!(keysInObject.includes(key))) {
                var error_message = ("ERROR WITHIN METADATAPROVIDER.on( notifyUserMessage, ... , the " + key + " property of the JSON message sent by the user is either not present.");
                console.error(error_message + "\nReturning and calling response.error()...");
                response.error(error_message);
                return;
            }
        });
        if (!(AVAILABLEITEMS.includes(json[requiredkeys[0]]))) {
            var error_message = "ERROR WITHIN THE METADATAPROVIDER.on( notifyUserMessage... event function. The json object \'" + itemName + "\' does not exist within the available items.";
            console.error(error_message + "Calling response.error() and returning...");
            response.error(error_message); // I don't know if this is a method of this object, but I am assuming so for no good reason for the time being.
            return;
        }
        var currencyPair = json[requiredkeys[0]];

        // The Client should provide a series of drip down menus that provide and translate into a Date object
        // parsable string Day[___] Month[___] Year[___] | Hour[___] Minute[___] Second[___]

        /**
         * The Date object is based on a time value that is the number of milliseconds since 1 January 1970 UTC
         * 
         * new Date(); new Date( value ); new Date( dateString) ;
         * new Date( year, monthIndex[, day [, hour [, minutes[, seconds[, milliseconds ]]]]] );
         * value: Integer value representing the number of milliseconds since January 1, 1970, 00:00:00 UTC, with leap seconds ignored.
         * dateString: String value representing a date. The string should be in a format recognized by the Date.parse() method.
         *  
         * parsing of the date string is strongly discouraged due to browser differences and inconsistencies.
         * 
         * year: Integer value from 0 to 99 map to the years 1900 to 1999. Outside of the 0-99, use the actual year.
         * monthIndex: 0 based.
         * 
         * The rest or normal integer values and behave as expected. 
         */
        var startTimeStamp;
        // The result of the below is going to be about 3 digits past our biggest integer in our database when referring
        // to timestamps, so well have to divide the timestamp by 1000, then round it up.
        // Date.UTC has the correct 13 digit millisecond time format, unlike the timestamps in the database recieved 
        // by 1Forge.
        var startDateObject = json[requiredkeys[1]];
        console.log(startDateObject.hour);
        // NOTE: This part is hardcoded
        try {
            startTimeStamp = Date.UTC(
                startDateObject.year, // Represents the year property of the level 3 object
                startDateObject.monthIndex, // Represents the monthIndex property of the level 3 object
                startDateObject.day, // Represents the day property of the level 3 object
                startDateObject.hour,  // Represents the hour property of the level 3 object
                startDateObject.minute, // Represents the minutes property of the level object
                startDateObject.second, // Represents the seconds property of the level object
                //json[requiredkeys[1]][6] // Represents the milliseconds property of the level object
            );
        }
        catch (error) {
            var error_message = "ERROR WITHIN THE METADATAPROVIDER.on( notifyUserMessage... the " + requiredkeys[1] + " object is invalid. Stack:\n" + error.stack;
            console.error(error_message + "Calling response.error() and returning...");
            response.error(error_message); // I don't know if this is a method of this object, but I am assuming so for no good reason for the time being.
            return;
        }

        console.log(`startTimestamp: ${startTimeStamp}`);
        var timePassPerTick = json[requiredkeys[2]];
        var UID = json[requiredkeys[3]];

        /**
         * Make sure ot have a function decleration out of this event function that looks something like this down below:
         * function customStreamItem ( currencyPair, startTimeStamp, timePassPerTick, UID ){
         *    this.currencyPair = currencyPair;
         *    this.startTimestamp = startTimeStamp;
         *    this.timePassPerTick = timePassPerTick;
         *    this.UID = UID;
         *    this.paused = false;
         *    this.unsubscribed = false;
         *    this.timerID;
         *    this.currentTimestamp;
         *    this.offset;
         *  }
         * 
         * 
         * */

        var customStreamObject = new customStreamItem(currencyPair, startTimeStamp, timePassPerTick, UID);
        customStreamItems.push(customStreamObject[requiredkeys[3]]);
        // We'll use the map object to map the unique id's to the objects.
        customStreamItemMap.set(UID, customStreamObject);
        // This object will be retrieved from the map in DATAPROVIDER.on(subscribe... )

        // The above is what should happen when a client under the command property of the JSON object
        // equals CREATE.

        console.log(`Successfully Created Custom Stream. Stream Item: ${UID}`);
        console.log("customStreamItems: ");
        console.log(customStreamItems);
        response.success();


    }
    else if (json.command == 'PAUSE') {
        requiredkeys = Object.keys(REQUIREDPROPERTIESPAUSE);
        requiredkeys.forEach((key) => {
            if (!(keysInObject.includes(key))) {
                var error_message = ("ERROR WITHIN METADATAPROVIDER.on( notifyUserMessage, ... , the " + key + " property of the JSON message sent by the user is either not present.");
                console.error(error_message + "\nReturning and calling response.error()...");
                response.error(error_message);
                return;
            }
        });

        customStreamItemMap.get(json[requiredkeys[0]]).paused = true;
        response.success();
    }

    else {
        console.error(`The command: ${json.command} isn't recognized. Returning and calling response.error()...`);
        response.error(`Command ${json.command} not recognized.`);
    }

});

function customStreamItem(currencyPair, startTimeStamp, timePassPerTick, UID) {
    this.currencyPair = currencyPair;
    this.startTimeStamp = startTimeStamp;
    this.timePassPerTick = timePassPerTick;
    this.UID = UID;
    this.paused = false;
    this.unsuscribed = false;
    this.timerID = undefined;
    this.currentTimeStamp = undefined;
    this.previousTimeStamp = undefined;
    this.endOfStreamReached = undefined;
}

// Please do note that you can only do variable injection within the pg module within only certain clauses 
// within the statement. For example, a variable injection within a FROM clause will not work. It will not
// recognize the variable injection and treat it as a literal. Other clauses will do the same. The SELECT 
// clause and therr VALUES clause are confirmed to work however. The ORDER BY CLAUSE is confirmed to work 
// as well when used with ABS clause.


// PLEASE DO NOTE that the customStream will reach for greater than AND less than timeStamps to find the
// closest match to the starting and current timeStamp.
function customStream(customStreamItemObject) {
    // The SELECT LIMIT clause selects from the top of records returned. Basically,
    // it counts from the first record returned. You can use the OFFSET clause after it offset the first
    // record by the amount ypu specify in the OFFSET clause.

    if ( customStreamItemObject.endOfStreamReached ){
        return;
    }

    // NOTE: The property of the customStreamItemObject below is hardcoded
    // Check to see if were paused or not subscribed to before we continue
    if (customStreamItemObject.paused || customStreamItemObject.unsubscribed) {
        // Do not continue forward and return. Becuase the setInterval will always just call a new instance
        // of this function after the set amount of time has passed anyway.
        return;
    }
    var values = [];
    // NOTE: The property of the customStreamItemObject below is hardcoded
    var text = `SELECT * FROM \"${customStreamItemObject.currencyPair}\" ORDER BY ABS((timestamp*1000)-$1) ASC LIMIT 1`;
    // NOTE: The property of the customStreamItemObject below is hardcoded.
    var associativeArray = new Array();


    // Determine whether to use startTimeStamp as a reference or currentTimeStamp as a reference
    // NOTE: The property of the customStreamItemObject below is hardcoded.
    if (customStreamItemObject.currentTimeStamp == undefined) {
        // Use the startTimeStamp as reference.
        // NOTE: The property of the customStreamItemObject below is hardcoded.
        values.push(customStreamItemObject.startTimeStamp);
        customStreamItemObject.currentTimeStamp = customStreamItemObject.startTimeStamp + customStreamItemObject.timePassPerTick;
    }

    else {
        // Use the currentTimeStamp as reference.
        // NOTE: The property of the customStreamItemObject below is hardcoded.
        values.push(customStreamItemObject.currentTimeStamp);
        customStreamItemObject.currentTimeStamp += customStreamItemObject.timePassPerTick;

    }
    customStreamItemObject.offset++;
    POSTGRECLIENT.query(text, values, (error, response) => {
        if (error) {
            console.error("ERROR WITHIN customStream( customStreamObejct ) when querying db:\n" + error.stack);
        }
        else {
            if (customStreamItemObject.previousTimeStamp == response.rows[0].timestamp*1000) {
                console.log("TRUE");
                console.log(`Previous TimeStamp: ${customStreamItemObject.previousTimeStamp}`)
                var retcontext = `SELECT * FROM \"${customStreamItemObject.currencyPair}\" WHERE timestamp > ${customStreamItemObject.previousTimeStamp/1000} ORDER BY ABS((timestamp*1000)- ${customStreamItemObject.previousTimeStamp}) ASC LIMIT 1`;
                POSTGRECLIENT.query(retcontext, [], (retconerror, retconresponse) => {
                    if (retconerror) {
                        console.error("ERROR WITHIN customStream( customStreamObejct ) when querying db:\n" + error.stack);
                    }
                    else {
                        if ( typeof retconresponse.rows[0] === 'undefined' ){
                            console.log( "\n\n!!!!!!!     END OF STREAM REACHED       !!!!!!");
                            customStreamItemObject.endOfStreamReached = true;
                            return;
                        }
                        associativeArray["price"] = retconresponse.rows[0].price.toString();
                        associativeArray["bid"] = retconresponse.rows[0].bid.toString();
                        associativeArray["ask"] = retconresponse.rows[0].ask.toString();
                        associativeArray["timestamp"] = ( retconresponse.rows[0].timestamp * 1000 ).toString();
                        console.log(`Fixed Timstamp: ${retconresponse.rows[0].timestamp *1000}`);
                        customStreamItemObject.previousTimeStamp = retconresponse.rows[0].timestamp * 1000;
                        customStreamItemObject.currentTimeStamp = retconresponse.rows[0].timestamp * 1000;
                        customStreamItemObject.currentTimeStamp += customStreamItemObject.timePassPerTick;
                        // NOTE: The property of the customStreamItemObject below is hardcoded.
                        DATAPROVIDER.update(customStreamItemObject.UID, false, associativeArray); // I have no idea what false stands for.
                    }
                });
            }
            else {
                console.log("Retuned Regular");
                if ( typeof response.rows[0] === 'undefined' ){
                    console.log( "\n\n!!!!!!!     END OF STREAM REACHED       !!!!!!");
                    customStreamItemObject.endOfStreamReached = true;
                    return;
                }
                associativeArray["price"] = response.rows[0].price.toString();
                associativeArray["bid"] = response.rows[0].bid.toString();
                associativeArray["ask"] = response.rows[0].ask.toString();
                associativeArray["timestamp"] = (response.rows[0].timestamp *1000 ).toString();
                customStreamItemObject.previousTimeStamp = response.rows[0].timestamp * 1000;
                // NOTE: The property of the customStreamItemObject below is hardcoded.
                DATAPROVIDER.update(customStreamItemObject.UID, false, associativeArray); // I have no idea what false stands for.
            }
        }
    });

}