import { Client } from 'pg';
//const { Client } = require('pg'); // A POSTGRESQL node module
import { rp } from 'request-promise';
//const rp = require('request-promise'); // A simplified HTTP client node module with promise functionality powered by Bluebird

// Make sure that you have already ran the pg_env bat file, as it makes sure 
// the Database service is actually running at the port. If the database service
// isn't running, the module, or any PG Tool even outside of Node for that matter, 
// we not be able to do anything because it will not be able to connect.

// Make sure to put in under the plugins array in the webpack.config file: new webpack.IgnorePlugin(/^pg-native$/)

// The net module REQUIRES internet for some reason, I mean, in the production version of this application, I understand
// why and that it will, but for development and testing I waish there was a way around this. This is going
// to be annoying to work with my application only when I have internet. However if that what the Lightstreamer module
// requires, then I'm screwed. Or maybe it can accept any stream. That'd be nice.

// TO DO: 
// We need to multiply all of the timestamp recieved by 1Forge by 1000 only because 
// the 1Forge timestamps only have UTC Millisecond Accuracy to seconds, and the extra 
// 3 zeros for the millisecond units are not present, making it appear to the pc as
// as smaller number than any timestamp comparison to regular UTC timeStamps. 
// For right now, the problem is worked around in the lightstreamer proxy adapter.

// Settings for Postgresql client
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

// Constants for 1Forge
const ONEFORGEBASEURL = 'https://forex.1forge.com/1.0.3'; // Just part of the path all the API services share in common.
const ONEFORGEAPIKEY = 'hyS1TnsYmv0VnkvbVzcSP0esuROQRm5l'; // The API key fot 1Forge since Spetmeber 3rd, 2018
const ONEFORGEAPIKEYPARAMETER = 'api_key';
const ONEFORGEQUOTEPARAMETER = 'pairs';


// Nadex currently only offers 10 Forex pairs.
const NADEXFOREXSYMBOLSARRAY = ['USDCAD', 'USDJPY', 'USDCHF', 'EURUSD', 'EURGBP', 'EURJPY', 'AUDUSD', 'AUDJPY', 'GBPUSD', 'GBPJPY'];


async function getAllSymbols() {
    var jsonBody;
    const GETSYMBOLPATH = '/symbols';
    const URL = ONEFORGEBASEURL + GETSYMBOLPATH + '?' + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    //console.log("Performing GET request to url: " + URL + " ...");
    try { jsonBody = await rp.get(URL); }
    catch (err) {
        console.error("ERROR WITHIN getAllSymbols. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    //console.info("GET request to " + URL + " succeeded.");
    return (JSON.parse(jsonBody)); // Returns a JSON Object, nothing else.
}

async function getQuote(currencyPairSymbolsArray) {
    var jsonBody;
    const GETQUOTEPATH = '/quotes';
    var pairs = '';
    currencyPairSymbolsArray.forEach((pair) => { pairs += (pair + ','); }); // The forEach method for arrays is blocking and not asynchronous
    pairs = pairs.slice(0, pairs.length - 1); // Just to get a comma seperated list of symbol currency pairs.
    const URL = ONEFORGEBASEURL + GETQUOTEPATH + '?' + ONEFORGEQUOTEPARAMETER + '=' + pairs + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    //console.log("Pairs: " + pairs);
    //console.log("Performing a GET request to " + URL + " :");
    try { jsonBody = await rp.get(URL); }
    catch (err) {
        console.error("ERROR WITHIN getQuote. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    //console.log("GET request to " + URL + " succeeded.");
    return (JSON.parse(jsonBody)); // Returns a JSON Object, nothing else.
}

async function getQuota() {
    const GETQUOTAPATH = '/quota';
    const URL = ONEFORGEBASEURL + GETQUOTAPATH + '?' + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    var jsonBody;
    //console.log("Performing a GET request to " + URL + " :");
    try { jsonBody = await rp.get(URL); }
    catch (err) {
        console.error("ERROR WITHIN getQuota. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    //console.log("GET request to " + URL + " succeeded.");
    return (JSON.parse(jsonBody)); // Returns a JSON Object, nothing else.
}

async function getMarketStatus() {
    const GETMARKETSTATUSPATH = '/market_status';
    const URL = ONEFORGEBASEURL + GETMARKETSTATUSPATH + '?' + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    var jsonBody;
    //console.log("Performing a GET request to " + URL + " :");
    try { jsonBody = await rp.get(URL); }
    catch (err) {
        console.error("ERROR WITHIN getMarketStatus. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    //console.log("GET request to " + URL + " succeeded.");
    return (JSON.parse(jsonBody));
}

async function devTestPostGreSqlDataEntry() {
    var getQuoteResponseArray;
    const CURRENCYPAIRSYMBOL = ['EURUSD'];
    var getMarketStatusResponseObject = await getMarketStatus();
    var getQuotaResponseObject = await getQuota();
    if ((getMarketStatusResponseObject.market_is_open) && (getQuotaResponseObject.quota_remaining > 0)) {
        await POSTGRECLIENT.connect();
        getQuoteResponseArray = await getQuote(CURRENCYPAIRSYMBOL);
        console.log(getQuoteResponseArray);
        var text = "INSERT INTO \"EURUSD\" VALUES($1,$2,$3,$4)";
        var values = [
            getQuoteResponseArray[0].price,
            getQuoteResponseArray[0].bid,
            getQuoteResponseArray[0].ask,
            getQuoteResponseArray[0].timestamp
        ];
        POSTGRECLIENT.query(text, values, (error, response) => {
            if (error) {
                console.error("ERROR WITHIN devTestPostGreSqlDataEntry() when querying db:");
                console.error(error.stack);
                console.error("Exitting immediately...");
                return;
            }
            else {
                //console.log("Successfully recorded in db");
            }
        });
    }

}

/**
 * IMPORTANT
 * 
 * REMEMEBR WE ONLY HAVE A CERTAIN NUMBER OF QUOTES FOR CURRENCY PAIRS WE CNA POSSIBLY GET A DAY, SO THATS
 * WHY WE ONLY REPEAT THE PROCESS OF GETTING THE QUOTE THROUGH POLLING AND ENTERING IT INOT THE POSTGRES
 * DATABASE ONLY LIKE A MINUTE AT A TIME. 
 * 
 * ALSO REMEBER THAT TIER TWO OF 1FORGE HAS WEBSOCKETS, SO THAT MIGHT PROVIDE US MILLISECOND DATA. WHEN WE
 * UPGRADE.
 */
export async function startMinimalEURUSD() {
    var getQuoteResponseArray;
    const CURRENCYPAIRSYMBOL = ['EURUSD'];
    var getQuotaResponseObject = await getQuota();
    if (!(getQuotaResponseObject.quota_remaining > 1)) {
        console.error("ERROR WITHIN startMinimalEURUSD, insufficient quota remaining.");
        console.error("Exitting the logging service to PostGres and returning...")
        return;
    }
    await POSTGRECLIENT.connect();
    var getMarketStatusResponseObject = await getMarketStatus();
    var timerID = setInterval(async function () {
        if ((getMarketStatusResponseObject.market_is_open) && (getQuotaResponseObject.quota_remaining > 0)) {
            getQuoteResponseArray = await getQuote(CURRENCYPAIRSYMBOL);
            // NOTE:
            // The timeStamps returned by 1Forge are EPOCH UNIX. 
            // It also seems like the free tier of 1Forge only provides data precise to one second. There
            // are no milliseconds accounted for in the timeStamp sadly. This might mean that five
            // second trading on Nadex isn't possible for our users without millisecond precise data :(
            // This also means we can completely get rid of the millisecond field from out user JSON 
            // metadata message and the field we use to parse that in the Date method toUTC().
            console.log(getQuoteResponseArray);
            var text = "INSERT INTO \"EURUSD\" VALUES($1,$2,$3,$4)";
            var values = [
                getQuoteResponseArray[0].price,
                getQuoteResponseArray[0].bid,
                getQuoteResponseArray[0].ask,
                getQuoteResponseArray[0].timestamp
            ];
            POSTGRECLIENT.query(text, values, (error, response) => {
                if (error) {
                    console.error("ERROR WITHIN startMinimalEURUSD() when querying db:");
                    console.error(error.stack);
                }
                else {
                    //console.log("Successfully recorded in db");
                }
            });
            getQuotaResponseObject = await getQuota();
            getMarketStatusResponseObject = await getMarketStatus();
        }
        else {
            console.error("ERROR WITHIN startMinimalEURUSD, insufficient quota remaining or market is closed.");
            console.error("Exitting the logging service to PostGres and returning...");
            return;
        }
        return;
    }, 120000);
    /*
    var getMarketStatusResponseObject = await getMarketStatus();
    await POSTGRECLIENT.connect();
    while ((getMarketStatusResponseObject.market_is_open) && (getQuotaResponseObject.quota_remaining > 0)) {
        getQuoteResponseArray = await getQuote(CURRENCYPAIRSYMBOL);
        var text = "INSERT INTO \"EURUSD\" VALUES($1,$2,$3,$4)";
        var values = [
            getQuoteResponseArray[0].price,
            getQuoteResponseArray[0].bid,
            getQuoteResponseArray[0].ask,
            getQuoteResponseArray[0].timestamp
        ];
        POSTGRECLIENT.query(text, values, (error, response) => {
            if (error) {
                console.error("ERROR WITHIN devTest() when querying eb:");
                console.error(error.stack);
            }
            else {
                console.log("Successfully recorded in db");
            }
        });
        getQuotaResponseObject = await getQuota();
        getMarketStatusResponseObject = await getMarketStatus();
    }
    console.error("ERROR WITHIN startMinimalEURUSD, insufficient quota remaining or market is closed.");
    console.error("Exitting the logging service to PostGres and returning...");
    return;
    */
}


// I looked up something about a TOP 1 function in SQL to select the most recent in something.
// I'll have to look into this further. Beats finding the max of a column and then retrieving the whole thing.
// That crap is not only complicated, but it also seems computationally taxing

// I found a solution but not the problem above. I just took the first result using the TOP(n) function
// of SQL and ordered the whole by timestamp in descending order. In the future though, this does seem 
// very computationally taxing, especially when our database gets larger. But honestly, for those that
// want to stream data in the past, this would actually be somewhat around the way to go in terms of 
// actually querying the database and using lightstreamer.

// Gets the most recent entry of currency data for a table.
// THIS FUNCTION IS BUSTED.
// NOTE: Use this function in the lightstreamer data adapter once it gets updated with limit please XD
export async function devTestPostGreSqlDataAquisition() { 
    await POSTGRECLIENT.connect();
    var text = "SELECT TOP(1) price, bid, ask, timestamp FROM \"EURUSD\" ORDER BY timestamp DESC";
    var values = [];
    POSTGRECLIENT.query( text, values, function( error, response ) {
        if (error) {
            console.error("ERROR WITHIN startMinimalEURUSD() when querying db:");
            console.error(error.stack);
        }
        else {
            console.log(response);
        }
    });
}