//Later find a way to put this inside functions
var joined = false;

async function getUsername() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                return username = userName;
            })
        }
        else {
            console.log("No user is logged in."); // Log a message when no user is logged in
            return null
        }
    })
}

async function displayEventInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");

    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            $('#replace-sport').text(doc.data().sport);
            $('#replace-skill').text(doc.data().skill);
            $('#replace-location').text(doc.data().location);
            $('#replace-host').text(doc.data().host);

            return doc;
        });
}

//Currently does not work
/*
async function checkIfJoined() {
    username = await getUsername();
    doc = await displayEventInfo();
    console.log(username);
    console.log(doc);

    var hasJoined = false;
    if (doc.data().participants.some(e => username)) {
        console.log("a")
        hasJoined = true;
    }
    else {
        hasJoined = false;
    }
}
*/

function updateJoinBtn() {
    var id = ""
    var buttonContent = ""

    if (joined) {
        id = "#event-join-button-joined"
        $("#event-join-button").attr("id", "event-join-button-joined");
        buttonContent = `
        <div class="row justify-content-center">
            <span class="col-auto material-symbols-outlined" style="padding: 0">
                done_outline
            </span>
            <p class="col-auto" style="margin: 0">Event Joined!</p>
        </div>`
    }
    else {
        id = "#event-join-button"
        $("#event-join-button-joined").attr("id", "event-join-button");
        buttonContent = `
        <div class="row justify-content-center">
            <span class="col-auto material-symbols-outlined" style="padding: 0">
                chair
            </span>
            <p class="col-auto" style="margin: 0">Join Event</p>
        </div>`
    }

    $(id).empty()
    $(id).append(buttonContent)
}

function clickJoinBtn() {
    //Change this to interact with Database instead of a variable, only changing if
    //the database is sucessfully updated (might need a loading version)
    joined = !joined
    updateJoinBtn()
}

async function setup() {
    $("#event-join-button").click(clickJoinBtn)
    updateJoinBtn()

    displayEventInfo()
}

$(document).ready(setup);