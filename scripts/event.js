function displayEventInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    localStorage.setItem("eventID", ID)

    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            $('#replace-sport').text(doc.data().sport);
            $('#replace-skill').text(doc.data().skill);
            $('#replace-location').text(doc.data().location);
            $('#replace-host').text(doc.data().host);

            var participants = doc.data().participants

            if (participants == null || participants.length == 0) $('#replace-participants').text("None");
            else {
                for (let i = 0; i < participants.length; i++) {
                    $('#replace-participants').text(participants[i] + "\n")

                    if (participants[i] == localStorage.getItem("userName")) {
                        joined = true;
                    }
                }
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

            //Always removes duplicates
            for (let i = 0; i < participants.length; i++) {
                if (participants[i] == localStorage.getItem("userName")) {
                    participants.splice(i, 1);
                    i = 0;
                }
            }

            if (joined) {
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

            displayEventInfo()
        })
}

function clickJoinBtn() {
    updateJoinBtn(localStorage.getItem("joined") === 'false')
}

function setup() {
    $("#event-join-button").click(clickJoinBtn)

    //Temporary
    localStorage.setItem("userName", "user")

    displayEventInfo()
}

$(document).ready(setup);