//Set constants for Adobe Connect roles:
const TITLE = "Lifeline Dashboard";
const APPID = "gov.fema.LifelineDashboard";
const VER = "1.1.001";
const K_HOST = "owner";
const K_PRESENTER = "presenter";
const K_PARTICIPANT = "viewer";


//Load the Adobe Connect SyncConnector SDK and listen for events
try {
    var syncConnector = ConnectCustomSDK.SyncConnector || {};
} catch (err) {
    // console.error(err);
    console.info("SyncConnector not loaded; Running locally.");
    setPermissions();
}
finally {
    if (typeof syncConnector != "undefined") {
        syncConnector.init(onConfigured, APPID, VER, "connectsdkhook");
        syncConnector.registerCallback("syncMessageReceived", syncMessageReceived);
        syncConnector.registerCallback("caughtUp", caughtUp);
        syncConnector.registerCallback("roleChanged", roleChanged);
    }
}

function onConfigured() {
    console.info(TITLE + " configured. Version: ", VER);
}

function caughtUp() {
    setPermissions();
}

function roleChanged() {
    setPermissions();
}

function setPermissions() {
    //If the user is a host, set a data attribute on the body
    if (isHost()) {
        document.body.dataset.ishost = "true";
    } else {
        document.body.dataset.ishost = "false";
    }
}

function isHost() {
    //Check to see if user is host
    if (typeof syncConnector != "undefined") {
        var thisUser = syncConnector.getMyUserDetails();
        if (thisUser.data == null) { return (false); }
        if (thisUser.data.role == K_HOST || thisUser.data.role == K_PRESENTER) {
            return (true);
        } else {
            return (false);
        }
    } else {
        //Running locally
        return (true);
    }
}

function syncMessageReceived(syncMsg) {
    var msgName = syncMsg.msgNm;
    var msgVal = syncMsg.msgVal;
    // console.log("Sync Message Received:", msgName);
    switch (msgName) {
        case "set1":
        case "set2":
        case "set3":
        case "set4":
        case "set5":
        case "set6":
            setImage(msgName, msgVal);
            break;

        default:
        //do nothing.
    }
}