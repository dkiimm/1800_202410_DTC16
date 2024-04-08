function GetTemplates() {
  $('#templates').load('./text/eventCard.html', function () {
    DisplayCards();
  });
}

function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userName = user.displayName;
      localStorage.setItem("userName", user.displayName)

    } else {
      localStorage.setItem("userName", null)
    }
  })
}

function DisplayCards() {
  let cardTemplate = document.getElementById('event_template'); // Define cardTemplate

  //Currently unused
  let params = new URL(window.location.href);
  let filter = params.searchParams.get("filter");


  db.collection('events').orderBy('date').get()
    .then(querySnapshot => {
      document.getElementById('future-events').innerHTML = ""

      querySnapshot.forEach(doc => {

        let card = cardTemplate.content.cloneNode(true);

        card.querySelector('#event-card').addEventListener("click", () => {
          //Later add functionality to get data from the specific event
          window.location = "event.html?docID=" + doc.id;
        });
        sport = doc.data().sport.toLowerCase();
        card.querySelector('#sportLogo').innerText = "sports_" + sport;
        card.querySelector('#replace-sport').innerText = doc.data().sport;
        card.querySelector('#replace-skill').innerText = doc.data().skill;
        card.querySelector('#replace-location').innerText = doc.data().location;
        card.querySelector('#replace-host').innerText = doc.data().host;
        card.querySelector('#replace-date').innerText = doc.data().date;
        card.querySelector('#replace-time').innerText = doc.data().time;

        numPlayers = doc.data().numPlayers
        if (doc.data().participants != null) {
          participants = doc.data().participants
          numPlayers = doc.data().numPlayers
          participantText = participants.length + 1 + "/" + numPlayers; // +1 to represent the host
          card.querySelector('#replace-participants').innerText = participantText;
        }
        else card.querySelector('#replace-participants').innerText = 1 + "/" + numPlayers;



        document.getElementById('future-events').append(card);
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
}

function setup() {
  getNameFromAuth();
  GetTemplates();
}

$(document).ready(setup);
