var joined = false;

function displayEventInfo() {
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
        });
}

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

function setup() {
    $("#event-join-button").click(clickJoinBtn)
    updateJoinBtn()

    displayEventInfo()
}

$(document).ready(setup);