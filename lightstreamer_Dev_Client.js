const ADAPTERSET = 'NADEX';
const PORT = 8080;
const LOCALHOST = 'localhost';
const ls = require('lightstreamer-client');
var client = new ls.LightstreamerClient("http://localhost:8080", ADAPTERSET);


async function subscribeToCustomStream(client, uid) {
    await setTimeout(() => {
        var subscription = new ls.Subscription('RAW', uid, ["price", "bid", "ask", "timestamp"]);
        subscription.addListener({
            onSubscription: function () { console.log("subscription success!! TO CUSTOM STREAM"); },
            onItemUpdate: function (updateObj) {
                console.log(updateObj);
            },
            onUnsubscription: function () { console.log('unsubscribed '); }
        });
        client.subscribe(subscription);
    }, 1000);
}

async function subscribe() {
    var client = new ls.LightstreamerClient("http://localhost:8080", ADAPTERSET);
    client.connect();
    var subscription = new ls.Subscription('RAW', "customStreamConfiguration", []);
    subscription.addListener({
        onSubscription: function () { console.log("subscription success!!"); },
        onItemUpdate: function (updateObj) {
            console.log(updateObj);
        },
        onUnsubscription: function () { console.log('unsubscribed '); }
    });
    client.subscribe(subscription);
    await setTimeout(() => {
        console.log("Successfully Paused.");
        send(client);
    }, 1000);
    //console.log(client.getStatus());
}

async function send(client) {
    var UID = '85d79873bde4a7fc93a4471a8344dda3';
    var clientlistener = {
        onError: function (originalMessage) {
            console.log("Error");
            console.log(originalMessage);
        },
        onAbort: function (originalMessage, sentOnNetwork) {
            console.log("Abort");
            console.log(originalMessage);
            console.log(sentOnNetwork);
        },
        onDeny: function (originalMessage, code, message) {
            console.log("Deny");
            console.log(originalMessage);
            console.log(code);
            console.log(message);
        },
        onDiscarded: function (originalMessage) {
            console.log(originalMessage);
        },
        onProcessed: function () {
            console.log("Processed");
            client.unsubscribe(client.getSubscriptions()[0]);
            console.log("Unsubscribed");
            subscribeToCustomStream(client, UID);

        }
    }
    var jsonObject = {
        'command': 'CREATE',
        'currencyPair': 'EURUSD',
        'startDate': {
            'year': 2018,
            'monthIndex': 8,
            'day': 29,
            'hour': 13,
            'minute': 30,
            'second': 45
        },
        'timePassPerTick': 1000,
        'UID': UID // This is and MD5 hash
    }

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
    // JSON.stringify(jsonObject)

    await client.sendMessage(JSON.stringify(jsonObject), undefined, undefined, clientlistener, undefined);
    return;
}

async function test() {
    /*
    var client = new ls.LightstreamerClient("http://localhost:8080", ADAPTERSET);
    client.connect();
    var subscription = new ls.Subscription('RAW', "customStreamConfiguration", []);
    subscription.addListener({
        onSubscription: function () { console.log("subscription success!!"); },
        onItemUpdate: function (updateObj) {
            console.log(updateObj);
        },
        onUnsubscription: function () { console.log('unsubscribed '); }
    });
    client.subscribe(subscription);
    await setTimeout(() => { console.log("Successfully Paused."), 1000 });
    console.log(client.getStatus());
    var clientlistener = {
        onError: function (originalMessage) {
            console.log("Error");
            console.log(originalMessage);
        },
        onAbort: function (originalMessage, sentOnNetwork) {
            console.log("Abort");
            console.log(originalMessage);
            console.log(sentOnNetwork);
        },
        onDeny: function (originalMessage, code, message) {
            console.log("Deny");
            console.log(originalMessage);
            console.log(code);
            console.log(message);
        },
        onDiscarded: function (originalMessage) {
            console.log(originalMessage);
        },
        onProcessed: async function () {
            console.log("Processed");
            console.log(onProcessed);
            await setTimeout(() => { console.log("Successfully Paused."), 1000 });
            client.disconnect();
        }
    }
    var jsonObject = {
        'command': 'CREATE',
        'currencyPair': 'EURUSD',
        'startDate': {
            'year': 2018,
            'monthIndex': 8,
            'day': 29,
            'hour': 13,
            'minute': 30,
            'second': 45
        },
        'timePassPerTick': 1000,
        'UID': '85d79873bde4a7fc93a4471a8344dda3' // This is and MD5 hash
    }

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
    // JSON.stringify(jsonObject)

    await subscribe();

}
test();
/*
var count = 0;
var subscription = new ls.Subscription('RAW', "EURUSD", ["price", "bid", "ask", "timestamp"]);
subscription.addListener({
   onSubscription: function () { console.log("subscription success!!"); },
   onItemUpdate: function (updateObj) {
       if (count > 2) {
           client.disconnect();
       }
       console.log(updateObj);
       count++;
   },
   onUnsubscription: function () { console.log('unsubscribed '); }
});

client.subscribe(subscription);
*/