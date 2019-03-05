import { Client } from 'pg';
// From the npm package pg. Handles a lot of postgres issue, but actaully doesn't play too nice with Babel for some reason. 

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

var connected = false;

POSTGRECLIENT.on('error', postgreSQLError(error) );

function postgreSQLError(errorObject) {
    console.error(`A POSTGRESQL ERROR OCCURED USING "${__filename}". HERE IS THE STACK TRACE BELOW:\n"${errorObject.stack}"`);
}

async function connect() {
    
    if ( connected ) { return; }
    else { 
        POSTGRECLIENT.connect( (error) => {
            if ( error ) {
                console.error(`A POSTGRESQL ERROR OCCURED USING "${__filename}" FUNCTION: ". HERE IS THE STACK TRACE BELOW:\n"${errorObject.stack}"`);
            }
        })
    }
}

// The storage of data doesn't need to be in a specific order because Postgres can order by timestamps.
async function storeCurrencyData( price, bid, ask, timestamp, database) {
    await POSTGRECLIENT.connect();
    const SQLCOMMAND = `INSERT INTO "${database}" VALUES( $1, $2, $3, $4 )`;
    const TEXT = SQLCOMMAND;
    const VALUES = [ price, bid, ask, timestamp ];

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