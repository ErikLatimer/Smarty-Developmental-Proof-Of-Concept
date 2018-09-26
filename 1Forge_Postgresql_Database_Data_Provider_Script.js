const { Client } = require ('pg'); // A POSTGRESQL node module
const rp = require('request-promise'); // A simplified HTTP client node module with promise functionality powered by Bluebird

// Settings for Postgresql client
const POSTGRESQLUSER = 'postgres';
const POSTGRESQLUSERPASSWORD = 'T!g31wo1f';
const POSTGRESQLHOST = 'localhost';
const POSTGRESQLDATABASE = 'minimaldb';
const POSTGRESQLPORT = 5432;

//Instantiate a Postgresql client
const POSTGRECLIENT = new Client ( {
    user: POSTGRESQLUSER,
    password: POSTGRESQLUSERPASSWORD,
    host: POSTGRESQLHOST,
    port: POSTGRESQLPORT,
    database: POSTGRESQLDATABASE
} );

// Constants for 1Forge
const ONEFORGEBASEURL = 'https://forex.1forge.com/1.0.3'; // Just part of the path all the API services share in common.
const ONEFORGEAPIKEY = 'hyS1TnsYmv0VnkvbVzcSP0esuROQRm5l'; // The API key fot 1Forge since Spetmeber 3rd, 2018
const ONEFORGEAPIKEYPARAMETER = 'api_key';
const ONEFORGEQUOTEPARAMETER = 'pairs';

const NADEXFOREXSYMBOLSARRAY = [ 'USDCAD', 'USDJPY', 'USDCHF', 'EURUSD', 'EURGBP', 'EURJPY', 'AUDUSD', 'AUDJPY', 'GBPUSD', 'GBPJPY' ];


export async function getAllSymbols() {
    var jsonBody;
    const GETSYMBOLPATH = '/symbols';
    const URL = ONEFORGEBASEURL + GETSYMBOLPATH + '?' + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    console.log ( "Performing GET request to url: " + URL + " ..." );
    try { jsonBody = await rp.get(URL); }
    catch(err) { 
        console.error("ERROR WITHIN getAllSymbols. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    console.info("GET request to " + URL + " succeeded.");
    return ( JSON.parse(jsonBody) ); // Returns a JSON Object, nothing else.
}

export async function getQuote( currencyPairSymbolsArray ){
    var jsonBody;
    const GETQUOTEPATH = '/quotes';
    var pairs = '';
    currencyPairSymbolsArray.forEach( (pair) => { pairs += ( pair + ','); } ); // The forEach method for arrays is blocking and not asynchronous
    pairs = pairs.slice( 0, pairs.length - 1 ); // Just to get a comma seperated list of symbol currency pairs.
    const URL = ONEFORGEBASEURL + GETQUOTEPATH + '?' + ONEFORGEQUOTEPARAMETER + '=' + pairs + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    console.log( "Pairs: " + pairs );
    console.log( "Performing a GET request to " + URL + " :" );
    try { jsonBody = await rp.get(URL); }
    catch ( err ) {
        console.error("ERROR WITHIN getQuote. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    console.log( "GET request to " + URL + " succeeded.");
    return ( JSON.parse ( jsonBody ) ); // Returns a JSON Object, nothing else.
}

export async function getQuota() {
    const GETQUOTAPATH = '/quota';
    const URL = ONEFORGEBASEURL + GETQUOTAPATH + '?' + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    var jsonBody;
    console.log( "Performing a GET request to " + URL + " :" );
    try { jsonBody = await rp.get(URL); }
    catch ( err ) {
        console.error("ERROR WITHIN getQuota. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    console.log( "GET request to " + URL + " succeeded.");
    return ( JSON.parse ( jsonBody ) ); // Returns a JSON Object, nothing else.
}

export async function getMarketStatus() {
    const GETMARKETSTATUSPATH = '/market_status';
    const URL = ONEFORGEBASEURL + GETMARKETSTATUSPATH + '?' + '&' + ONEFORGEAPIKEYPARAMETER + '=' + ONEFORGEAPIKEY;
    var jsonBody;
    console.log ( "Performing a GET request to " + URL + " :" );
    try { jsonBody = await rp.get( URL ); }
    catch ( err ) {
        console.error("ERROR WITHIN getMarketStatus. GET request to url: " + URL + " failed. Error Object:");
        console.error(err.stack);
        console.error("Returning null...");
        return null;
    }
    console.log( "GET request to " + URL + " succeeded.");
    return ( JSON.parse ( jsonBody ) );
}

export async function devTest() {
    var getQuoteResponseArray;
    const CURRENCYPAIRSYMBOL = ['EURUSD'];
    var getMarketStatusResponseObject = await getMarketStatus();
    var getQuotaResponseObject = await getQuota();
    if ( (getMarketStatusResponseObject.market_is_open) && (getQuotaResponseObject.quota_remaining > 0) ){
        await POSTGRECLIENT.connect();
        getQuoteResponseArray = await getQuote(CURRENCYPAIRSYMBOL);
        var text = "INSERT INTO \"EURUSD\" VALUES($1,$2,$3,$4)";
        var values = [
            getQuoteResponseArray[0].price,
            getQuoteResponseArray[0].bid,
            getQuoteResponseArray[0].ask,
            getQuoteResponseArray[0].timestamp
        ];
        POSTGRECLIENT.query( text, values, ( error, response ) => {
            if ( error ) { 
                console.error( "ERROR WITHIN devTest() when querying eb:" ); 
                console.error ( error.stack );
                console.error( "Exitting immediately..." );
                return;
            } 
            else {
                console.log ( "Successfully recorded in db" ); 
            }
        });
    }

}