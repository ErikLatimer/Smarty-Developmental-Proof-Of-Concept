const { Client } = require('pg');
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

// THIS ACTAULLY WORKS XDXD
async function devTest() {
    // WORKS
    /**
     * 
     * await POSTGRECLIENT.connect();
  var TEXTCUSTOMSTREAM = "SELECT * FROM \"EURUSD\" ORDER BY ABS((timestamp*1000)-$1) ASC limit 1";
    text = TEXTCUSTOMSTREAM;
    values = [ 1539266146450 ];
    POSTGRECLIENT.query(text,values, (error, response) => {
        if (error) {
            console.error("ERROR WITHIN customStream( customStreamObejct ) when querying db:\n" + error.stack);
        }
        else {
            // NOTE: The property of the customStreamItemObject below is hardcoded.
            //DATAPROVIDER.update(customStreamObejct.UID, false, { 'quote': response.rows[0] }); // I have no idea what false stands for.
            console.log(response.rows[0]);
            console.log(response);
        }
    });
};
     * 
     * 
     * 
     */
    await POSTGRECLIENT.connect();
    var currencyPairSymbol = "EURUSD";
    var TEXTCUSTOMSTREAM = `SELECT * FROM \"${currencyPairSymbol}\" ORDER BY timestamp DESC limit 1`;;
    text = TEXTCUSTOMSTREAM;
    var values = [];
    POSTGRECLIENT.query(text, values, (error, response) => {
        if (error) {
            console.error("ERROR WITHIN customStream( customStreamObejct ) when querying db:\n" + error.stack);
        }
        else {
            // NOTE: The property of the customStreamItemObject below is hardcoded.
            //DATAPROVIDER.update(customStreamObejct.UID, false, { 'quote': response.rows[0] }); // I have no idea what false stands for.
            console.log(response.rows[0]);
        }
    });
};
devTest();