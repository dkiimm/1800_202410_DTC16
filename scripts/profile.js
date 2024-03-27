function GetUser() {
  let user = firebase.auth().currentUser;

  if (!user) {
    console.error('No user signed in');
    return;
  }

  params = new URL(window.location.href);
  userPage = params.searchParams.get("userID");
  if (userPage == null || userPage == localStorage.getItem("userName")) {
    $("#page-title").text("My hosted events")
    DisplayCards(user.uid)
  }
  else {
    $("#page-title").text(userPage + "'s hosted events")

    db.collection('users')
      .where("name", "==", userPage)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          DisplayCards(doc.id)
        })
      })
  }
}

function DisplayCards(userID) {
  let cardTemplate = document.getElementById('event_template'); // Define cardTemplate

  db.collection('events')
    .where("author", "==", userID)
    .get()
    .then(querySnapshot => {
      document.getElementById('future-events').innerHTML = "";

      querySnapshot.forEach(doc => {
        let card = cardTemplate.content.cloneNode(true);

        card.querySelector('#event-card').addEventListener("click", () => {
          // Later add functionality to get data from the specific event
          window.location = "event.html?docID=" + doc.id;
        });

        card.querySelector('#replace-sport').innerText = doc.data().sport;
        card.querySelector('#replace-skill').innerText = doc.data().skill;
        card.querySelector('#replace-location').innerText = doc.data().location;
        card.querySelector('#replace-host').innerText = doc.data().host;
        card.querySelector('#replace-date').innerText = doc.data().date;
        card.querySelector('#replace-time').innerText = doc.data().time;
        if (doc.data().participants != null) {
          participants = doc.data().participants
          card.querySelector('#replace-participants').innerText = participants.length + 1; // +1 to represent the host
        }
        else card.querySelector('#replace-participants').innerText = 1;

        document.getElementById('future-events').appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
}

// Call the function to display the cards when the authentication state changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    GetUser();
  } else {
    console.error('No user signed in');
  }
});


