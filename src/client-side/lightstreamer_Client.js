import { ls } from 'lightstreamer-client'
//const ls = require('lightstreamer-client');
import { uuidv1 } from 'uuid/v1';
//const uuidv1 = require('uuid/v1');
// uuidv1 creates unique id's based off of timestamps. Generate and return a RFC4122 v1 (timestamp-based) UUID. 
// Returns buffer, if specified, otherwise the string form of the UUID Note: The id is generated guaranteed to stay constant for the lifetime of the current JS runtime.
// (Future versions of this module may use persistent storage mechanisms to extend this guarantee.)

// Refering to client.connect()
// Note that the request to connect to the lightstreamer service is accomplished by the client asynchronously, this means that an invocation to LightstreamerClient#getStatus right after connect() might not reflect the change yet.

// Maybe we should add a pause after the connect method and the subscription method so that way we can confirm it connected?

export class lightstreamerClient {

    static ADAPTERSETMAP = {
        'nadex': 'NADEX',
        'currency_data': 'CURRENCY_DATA'
    };
    // The port of where the lightstreamer service is running on the server.
    static PORT = 8080;
    // The host of our server
    static HOST = 'localhost';
    //var client = new ls.LightstreamerClient("http://localhost:8080", ADAPTERSET);
    static SERVERADDRESS = `http://${lightstreamerClient.HOST}:${lightstreamerClient.PORT}`;
    static SERVERADDRESSHTTPS = `https://${lightstreamerClient.HOST}:${lightstreamerClient.PORT}`;

    static defaultCurrencyPairDataCustomStreamSubscription(client, uid) {

        var default_Currency_Pair_Data_Custom_Stream_Subscription;

        const DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_MODE = "RAW";
        const DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_ITEMS = [UUID];
        const DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_FIELDS = ["price", "bid", "ask", "timestamp"];

        const UUID = uid;



        try { default_Currency_Pair_Data_Custom_Stream_Subscription = new ls.Subscription(DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_MODE, DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_ITEMS, DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_FIELDS); }
        catch (exception) {
            console.error(`ERROR THROWN WITHIN lightstreamer_Client.js, method defaultCurrencyPairDataCustomStreamSubscription ( client, uid ), when trying to instiantiate a lightstreamer subscription with subscription mode: "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_MODE}" with items: "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_ITEMS}" and with fields: "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_FIELDS}".\nMessage provided by exception: "${exception.message}".\nType of exception: "${exception.name}". \nReturning...`);
            return null;
        }
        const DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_SUBSCRIPTION_LISTENER = {
            onSubscription: function () { console.log(`Successfully subscribed to: "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_MODE}", "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_ITEMS}", "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_FIELDS}"`); },
            onItemUpdate: function (updatedItemObject) { console.log(updatedItemObject); },
            onUnsubscription: function () { console.log(`Unsubscribed from: "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_MODE}", "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_ITEMS}", "${DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_FIELDS}"`); }
        };

        default_Currency_Pair_Data_Custom_Stream_Subscription.addListener(DEFAULT_CURRENCY_PAIR_DATA_CUSTOM_STREAM_SUBSCRIPTION_SUBSCRIPTION_LISTENER);

        try { client.subscribe(default_Currency_Pair_Data_Custom_Stream_Subscription); }
        catch (exception) {
            console.error(`ERROR THROWN WITHIN lightstreamer_Client.js, method defaultCurrencyPairDataCustomStreamSubscription ( client, uid ), when trying to subscribe to the lightstreamer with subscription mode: "${default_Currency_Pair_Data_Custom_Stream_Subscription.getMode()}" with items: "${default_Currency_Pair_Data_Custom_Stream_Subscription.getItems()}" with item group: "${default_Currency_Pair_Data_Custom_Stream_Subscription.getItemGroup()}" with fields: "${default_Currency_Pair_Data_Custom_Stream_Subscription.getFields()}" attempting to use Data Adapter: "${default_Currency_Pair_Data_Custom_Stream_Subscription.getDataAdapter()}" with listeners: "${default_Currency_Pair_Data_Custom_Stream_Subscription.getListeners()}".\nMessage provided by exception: "${exception.message}".\nType of exception: "${exception.name}". \nReturning...`);
            return null;
        }

    }


    // Returns a successfully subscribed, and connected default InitialSubscription lightstreamer client.
    static defaultInitialClientAndSubscription(adapterSet) {
        // Can we await the subscription.connect() method? Because if we could that would actually be really usefull.
        var lsC = lightstreamerClient;
        var default_Initial_Client;
        console.log ( lsC.SERVERADDRESS );
        console.log( lsC.ADAPTERSETMAP[adapterSet] );
        try { default_Initial_Client = new ls.LightstreamerClient(lsC.SERVERADDRESS, lsC.ADAPTERSETMAP[adapterSet]); }
        catch (exception) {
            console.error(`ERROR THROWN WITHIN lightstreamer_Client.js, method defaultInitialClient(adapterSet), when trying to instiantiate a lightstreamer client with the given parameters address: "${SERVERADDRESS}" with adapter set: "${ADAPTERSETMAP[adapterSet]}".\nMessage provided by exception: "${exception.message}".\nType of exception: "${exception.name}". \nReturning...`);
            return null;
        }
        try { default_Initial_Client.connect(); }
        catch (exception) {
            console.error(`ERROR THROWN WITHIN lightstreamer_Client.js, method defaultInitialClient(adapterSet), when trying to connect to the lightstreamer server at address "${SERVERADDRESS}" with adapter set "${ADAPTERSETMAP[adapterSet]}".\nMessage provided by exception: "${exception.message}".\nType of exception: "${exception.name}". \nReturning...`);
            return null;
        }
        var defaultInitialSubscription;

        const DEFAULT_INITIAL_SUBSCRIPTION_MODE = "RAW";
        const DEFAULT_INITIAL_ITEMS = ["customStreamConfiguration"];
        const DEFAULT_INITIAL_FIELDS = [];

        try { defaultInitialSubscription = new ls.Subscription(DEFAULT_INITIAL_SUBSCRIPTION_MODE, DEFAULT_INITIAL_ITEMS, DEFAULT_INITIAL_FIELDS); }
        catch (exception) {
            console.error(`ERROR THROWN WITHIN lightstreamer_Client.js, method defaultInitialClient(adapterSet), when trying to instiantiate a lightstreamer subscription with subscription mode: "${DEFAULT_INITIAL_SUBSCRIPTION_MODE}" items: "${DEFAULT_INITIAL_ITEMS}" with fields: "${DEFAULT_INITIAL_FIELDS}".\nMessage provided by exception: "${exception.message}".\nType of exception: "${exception.name}". \nReturning...`);
            return null;
        }
        const DEFAULTINITALSUBSCRIPTIONLISTENER = {
            onSubscription: function () { console.log(`Successfully subscribed to subscription mode: "${DEFAULT_INITIAL_SUBSCRIPTION_MODE}", items:"${DEFAULT_INITIAL_ITEMS}", with fields: "${DEFAULT_INITIAL_FIELDS}"`); },
            onItemUpdate: function (updatedItemObject) { console.log(updatedItemObject); },
            onUnsubscription: function () { console.log(`Unsubscribed from subscription mode: "${DEFAULT_INITIAL_SUBSCRIPTION_MODE}", items: "${DEFAULT_INITIAL_ITEMS}", with fields: "${DEFAULT_INITIAL_FIELDS}"`); }
        }

        defaultInitialSubscription.addListener(DEFAULTINITALSUBSCRIPTIONLISTENER);

        try { default_Initial_Client.subscribe(defaultInitialSubscription); }
        catch (exception) {
            console.error(`ERROR THROWN WITHIN lightstreamer_Client.js, method defaultInitialClient(adapterSet), when trying to subscribe to the lightstreamer with subscription mode: "${defaultInitialSubscription.getMode()}" items: "${subscription.getItems()}" with item group: "${defaultInitialSubscription.getItemGroup()}" with fields: "${subscription.getFields()}" attempting to use Data Adapter: "${defaultInitialSubscription.getDataAdapter()}" with listeners: "${defaultInitialSubscription.getListeners()}".\nMessage provided by exception: "${exception.message}".\nType of exception: "${exception.name}". \nReturning...`);
            return null;
        }

        return default_Initial_Client;
   
    }

    static createPauseCurrencyPairDataCustomStreamMessage(uid) {

        const UUID = uid;
        const COMMAND = 'PAUSE';
        const MESSAGE = {
            'command': COMMAND,
            'UID': uid
        }
        return {
            message: JSON.stringify(MESSAGE),
            UIDOfStream: UUID
        }

    }

    static createResumeCurrencyPairDataCustomStreamMessage(uid) {

        const UUID = uid;
        const COMMAND = 'RESUME';
        const MESSAGE = {
            'command': COMMAND,
            'UID': uid
        }
        return {
            message: JSON.stringify(MESSAGE),
            UIDOfStream: UUID
        }

    }

    // We call this a message for semantic purposes but this function really returns an object.
    static createRequestCurrencyPairDataCustomStreamMessage(currencyPairNoSlashesAllCaps, year, monthByIndexBase0, day, hour, minute, second, timePassPerTickInMilliseconds) {

        const STARTDATE = {
            'year': year,
            'monthIndex': monthByIndexBase0,
            'day': day,
            'hour': hour,
            'mintue': minute,
            'second': second
        };
        const COMMAND = 'CREATE';
        const TIMEPASSPERTICK = timePassPerTickInMilliseconds;
        const UUID = uuidv1();
        const MESSAGE = {
            'command': COMMAND,
            'currencyPair': currencyPairNoSlashesAllCaps,
            'startDate': STARTDATE,
            'timePassPerTick': TIMEPASSPERTICK,
            'UID': UUID
        };
        return {
            message: JSON.stringify(MESSAGE),
            UIDOfStream: UUID
        }

    }

    async resumeOrResumeCurrencyPairDataCustomStream(client, message) {
        const DEFAULT_REQUEST_CURRENCY_PAIR_DATA_CUSTOM_STREAM_CLIENT_MESSAGE_LISTENER = {
            onError: function (originalMessage) {
                // Event handler that is called by Lightstreamer when the related message has been processed by the Server but the processing has failed for any reason. The level of completion of the processing by the Metadata Adapter cannot be determined.
                console.error(`ERROR "ERROR" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}"`);
            },
            onAbort: function (originalMessage, sentOnNetwork) {
                // Event handler that is called by Lightstreamer when any notifications of the processing outcome of the related message haven't been received yet and can no longer be received. Typically, this happens after the session has been closed. In this case, the client has no way of knowing the processing outcome and any outcome is possible.
                console.error(`ERROR "ABORT" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}"\nWas the messgae probably sent on the network: "${sentOnNetwork}".`);
            },
            onDeny: function (originalMessage, code, message) {
                // Event handler that is called by Lightstreamer when the related message has been processed by the Server but the expected processing outcome could not be achieved for any reason.
                console.error(`ERROR "DENY" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}"\nCode sent from server: "${code}"\nMessage sent from server: "${message}".`);
            },
            onDiscarded: function (originalMessage) {
                // Event handler that is called by Lightstreamer to notify that the related message has been discarded by the Server. This means that the message has not reached the Metadata Adapter and the message next in the sequence is considered enabled for processing
                console.error(`ERROR "DISCARDED" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}".`);
            },
            onProcessed: function (originalMessage) {
                // Event handler that is called by Lightstreamer when the related message has been processed by the Server with success.
                console.log(`Message "${originalMessage}" processed successfully by the server,`);
            }
        };
        await client.sendMessage(message, undefined, undefined, DEFAULT_REQUEST_CURRENCY_PAIR_DATA_CUSTOM_STREAM_CLIENT_MESSAGE_LISTENER, undefined);
    }

    async requestCurrencyPairDataCustomStream(client, message) {
        const DEFAULT_REQUEST_CURRENCY_PAIR_DATA_CUSTOM_STREAM_CLIENT_MESSAGE_LISTENER = {
            onError: function (originalMessage) {
                // Event handler that is called by Lightstreamer when the related message has been processed by the Server but the processing has failed for any reason. The level of completion of the processing by the Metadata Adapter cannot be determined.
                console.error(`ERROR "ERROR" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}"`);
            },
            onAbort: function (originalMessage, sentOnNetwork) {
                // Event handler that is called by Lightstreamer when any notifications of the processing outcome of the related message haven't been received yet and can no longer be received. Typically, this happens after the session has been closed. In this case, the client has no way of knowing the processing outcome and any outcome is possible.
                console.error(`ERROR "ABORT" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}"\nWas the messgae probably sent on the network: "${sentOnNetwork}".`);
            },
            onDeny: function (originalMessage, code, message) {
                // Event handler that is called by Lightstreamer when the related message has been processed by the Server but the expected processing outcome could not be achieved for any reason.
                console.error(`ERROR "DENY" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}"\nCode sent from server: "${code}"\nMessage sent from server: "${message}".`);
            },
            onDiscarded: function (originalMessage) {
                // Event handler that is called by Lightstreamer to notify that the related message has been discarded by the Server. This means that the message has not reached the Metadata Adapter and the message next in the sequence is considered enabled for processing
                console.error(`ERROR "DISCARDED" OCCURED WHILE sending message to metadata adapter to request custom currency pair data stream.\nOriginal message to be sent: "${originalMessage}".`);
            },
            onProcessed: function (originalMessage) {
                // Event handler that is called by Lightstreamer when the related message has been processed by the Server with success.
                console.log(`Message "${originalMessage}" processed successfully by the server,`);
                client.unsubscribe(client.getSubscriptions()[0]);

            }
        };
        // The sendMessage API:
        /*
        
            msg: a text message, whose interpretation is entirely demanded to the Metadata Adapter associated to the current connection.
    
            sequence: an alphanumeric identifier, used to identify a subset of messages to be managed in sequence; underscore characters are also allowed. If the "UNORDERED_MESSAGES" identifier is supplied, the message will be processed in the special way described above. 
            The parameter is optional; if not supplied, "UNORDERED_MESSAGES" is used as the sequence name.
    
            defaultTimeout: a timeout, expressed in milliseconds. If higher than the Server default timeout, the latter will be used instead. 
            The parameter is optional; if not supplied, the Server default timeout will be applied. 
            This timeout is ignored for the special "UNORDERED_MESSAGES" sequence.
    
            listener: an object suitable for receiving notifications about the processing outcome. 
            The parameter is optional; if not supplied, no notification will be available.
    
            enqueueWhileDisconnected: if this flag is set to true, and the client is in a disconnected status when the provided message is handled, then the message is not aborted right away but is queued waiting for a new session. Note that the message can still be aborted later when a new session is established.
        */

        await client.sendMessage(message, undefined, undefined, DEFAULT_REQUEST_CURRENCY_PAIR_DATA_CUSTOM_STREAM_CLIENT_MESSAGE_LISTENER, undefined);
        return message.UID;
        
    }

    async test1() {
        var client = await defaultInitialClientAndSubscription('NADEX');
        return client;
    }

    static test() {
        var lsC = lightstreamerClient;
        var client = lsC.defaultInitialClientAndSubscription('nadex');
        console.log( client.getSubscriptions() );
        var details = lsC.createRequestCurrencyPairDataCustomStreamMessage('EURUSD',2018,8,29,12,30,42,1000);
        console.log( `Message: "${details.message}"\nUUID of stream:${details.UIDOfStream}` );
    }

    async testSubscribeToCustomStream(client, uid) {
        var count = 0;
        await setTimeout(() => {
            var subscription = new ls.Subscription('RAW', uid, ["price", "bid", "ask", "timestamp"]);
            subscription.addListener({
                onSubscription: function () { console.log("subscription success!! TO CUSTOM STREAM"); },
                onItemUpdate: function (updateObj) {
                    if (count == 6) {
                        var jsoncommand = { 'command': 'PAUSE', 'UID': uid };
                        client.sendMessage(JSON.stringify(jsoncommand), undefined, undefined, undefined, undefined);
                    }
                    console.log(updateObj);
                    count++;
                },
                onUnsubscription: function () { console.log('unsubscribed '); }
            });
            client.subscribe(subscription);
        }, 1000);
    }

}