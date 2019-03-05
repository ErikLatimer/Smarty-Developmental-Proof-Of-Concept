/**
 * This class is meant to provide data from the postGres Database where needed in the program, through lightstreamer.
 * 
 * I am going to have to use my lightstreamer_Client.js to provide data because I am going to HAVE to connect to my PostGres database. Actaully, But what if I just 
 * want a payload of data just right then? What if I don't want to stream data? I already have to connect to my Postgres database. I might have to put the connection
 * object and details in a seperate js file sense I will have to use the object and credientails in this file, and it is used in lightstreamer_Client.js.
 */