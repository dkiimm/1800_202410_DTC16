function GetTemplates() {
  $('#templates').load('./text/eventCard.html', function () {
    GetUser()
  });
}

function GetUser() {
  let user = firebase.auth().currentUser;

  if (!user) {
    console.error('No user signed in');
    return;
  }

  params = new URL(window.location.href);
  userPage = params.searchParams.get("userID");
  if (userPage == null || userPage == localStorage.getItem("userName")) {
    $("#page-title").text("My profile")
    DisplayCards(user.uid)
  }
  else {
    $("#page-title").text(userPage + "'s profile")
    CheckFriendStatus(userPage)

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

function CheckFriendStatus(profileID) {
  user = firebase.auth().currentUser;

  db.collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      friends = doc.data().friends
      added = false

      if (friends != null && friends.length != 0) {
        if (friends.find(f => f == profileID)) {
          added = true
        }
      }

      displayFriendButton(added)
    })
}

function displayFriendButton(isAdded) {
  if (isAdded) {
    $("#friend-button").hide()
    $("#unfriend-button").show()
  }
  else {
    $("#friend-button").show()
    $("#unfriend-button").hide()
  }
}

function DisplayCards(profileID) {
  let cardTemplate = document.getElementById('event_template'); // Define cardTemplate

  db.collection('events')
    .where("author", "==", profileID)
    .get()
    .then(querySnapshot => {
      empty = true
      $('#loading').text("No events found.")

      querySnapshot.forEach(doc => {
        if (empty == true) {
          empty = false
          document.getElementById('future-events').innerHTML = "";
        }

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

        let participants = doc.data().participants || []; // Default to an empty array if participants is null
        let numPlayers = doc.data().numPlayers || 1; // Default to 1 if numPlayers is null
        let participantText = (participants.length + 1) + "/" + numPlayers; // +1 to represent the host
        card.querySelector('#replace-participants').innerText = participantText;

        document.getElementById('future-events').appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
}

function updateFriend(isAdding) {
  let user = firebase.auth().currentUser;
  if (!user) {
    console.error('No user signed in');
    return;
  }

  let params = new URL(window.location.href);
  let userPage = params.searchParams.get("userID");
  let userID = firebase.auth().currentUser.uid;
  let hostRef = db.collection("users").doc(userID);

  // Add the friend directly to the user's document
  if (isAdding) {
    hostRef.update({
      friends: firebase.firestore.FieldValue.arrayUnion(userPage)
    })
      .then(() => {
        window.alert("Friend added successfully!");
        displayFriendButton(true)
      })
      .catch(() => {
        window.alert("Error adding friend, plese try again later");
      });
  }
  else {
    hostRef.update({
      friends: firebase.firestore.FieldValue.arrayRemove(userPage)
    })
      .then(() => {
        window.alert("Friend removed successfully!");
        displayFriendButton(false)
      })
      .catch(() => {
        window.alert("Error removing friend, plese try again later");
      });
  }
}

function setup() {
  GetTemplates()
}

// Call the function to display the cards when the authentication state changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    setup();
  } else {
    console.error('No user signed in');
  }
});



