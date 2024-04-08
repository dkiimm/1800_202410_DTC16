function displayEventInfo(setup) {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    localStorage.setItem("eventID", ID)

    if (ID == null) {
        alert("No event found")
        window.location = "main.html"
    }

    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            sport = doc.data().sport.toLowerCase();
            $('#sportLogo').text("sports_" + sport);
            $('#replace-sport').text(doc.data().sport);
            $('#replace-skill').text(doc.data().skill);
            $('#replace-location').text(doc.data().location);
            let host = "<a href='profile.html?userID=" + doc.data().host + "' id='profile-links'>" + doc.data().host + "</a>"
            $('#replace-host').text("")
            $('#replace-host').append(host)
            $('#replace-date').text(doc.data().date);
            $('#replace-time').text(doc.data().time);

            let participants = doc.data().participants
            let joined = false;

            if (participants == null || participants.length == 0) $('#replace-participants').text("None");
            else {
                p_list = ""
                end = ", "
                for (let i = 0; i < participants.length; i++) {
                    if (i == participants.length - 1) end = ""
                    userLink = "<a href='profile.html?userID="
                        + participants[i] + "' id='profile-links'>" + participants[i] + end + "</a>"
                    p_list += userLink

                    if (participants[i] == localStorage.getItem("userName")) {
                        joined = true;
                    }
                }
                $('#replace-participants').text("")
                $('#replace-participants').append(p_list)
            }

            if (setup) {
                if (doc.data().host == localStorage.getItem("userName")) {
                    $("#event-join-button").hide()
                    $("#event-delete-button").show()
                }
                else updateJoinBtn(joined)
            }

        })
}

function updateJoinBtn(joined) {
    localStorage.setItem("joined", joined)

    let id = ""
    let buttonContent = ""

    currentEvent = db.collection("events").doc(localStorage.getItem("eventID"))
    db.collection("events")
        .doc(localStorage.getItem("eventID"))
        .get()
        .then(async doc => {
            participants = doc.data().participants
            if (participants == null) participants = [];

            //Always removes duplicates if there are any
            for (let i = 0; i < participants.length; i++) {
                if (participants[i] == localStorage.getItem("userName")) {
                    participants.splice(i, 1);
                    i = 0;
                }
            }

            if (joined) {
                if (localStorage.getItem("userName") == null) {
                    alert("You must log in to join an event!")
                    return null
                }
                id = "#event-join-button-joined"
                $("#event-join-button").attr("id", "event-join-button-joined");
                buttonContent = `
                    <div class="row justify-content-center">
                        <span class="col-auto material-symbols-outlined" style="padding: 0">
                            done_outline
                        </span>
                        <p class="col-auto" style="margin: 0">Event Joined!</p>
                    </div>`;

                participants.push(localStorage.getItem("userName"))
                localStorage.setItem("joined", true)
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
                    </div>`;

                localStorage.setItem("joined", false)
            }

            joined = !joined
            currentEvent.update({
                participants: participants
            })
            $(id).empty()
            $(id).append(buttonContent)

            displayEventInfo(false)
        })
}

function clickJoinBtn() {
    updateJoinBtn(localStorage.getItem("joined") === 'false')
}

function clickBackBtn() {
    history.back()
}

function deleteEvent() {
    db.collection("events")
        .doc(localStorage.getItem("eventID"))
        .get()
        .then(doc => {
            let message = "Are you sure you want to delete this event?"
            deleteConfirmed = window.confirm(message)
            if (deleteConfirmed) {
                db.collection("events").doc(localStorage.getItem("eventID"))
                    .delete()
                    .then(() => {
                        window.alert("Event deleted.")
                        window.location = "main.html"
                    }).catch((error) => {
                        window.alert("Error deleting event, try again later.")
                    });
            }
        })
}

function setup() {
    $("#event-join-button").click(clickJoinBtn)
    $("#event-back-button").click(clickBackBtn)

    displayEventInfo(true)
}

$(document).ready(setup);