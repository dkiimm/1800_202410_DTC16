var joined = false;

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
}

$(document).ready(setup);