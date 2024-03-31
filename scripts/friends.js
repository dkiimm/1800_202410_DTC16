function DisplayCards() {
  // Listen for authentication state changes
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in, you can access user details here
      const userID = user.uid;
      console.log(userID);
      // Call the function to display cards with the user ID
      fetchAndDisplayCards(userID);
    } else {
      // No user is signed in, handle this case if needed
      console.log("No user is signed in.");
      // You might want to display a message or redirect the user to a login page
    }
  });
}

function fetchAndDisplayCards(userID) {
  let cardTemplate = document.getElementById('event_template');
  let futureEventsContainer = document.getElementById('future-events');

  if (!cardTemplate || !futureEventsContainer) {
    console.error('Template or container not found');
    return;
  }

  // Clear previous content
  futureEventsContainer.innerHTML = "";

  db.collection('users')
    .doc(userID)
    .get()
    .then(doc => {
      if (doc.exists) {
        let friends = doc.data().friends || [];

        friends.forEach(friend => {
          let card = cardTemplate.content.cloneNode(true);
          let cardButton = card.querySelector('#event-card');
          let replaceFriendSpan = card.querySelector('#replace-friend');

          // Add event listener to the card button
          cardButton.addEventListener("click", () => {
            // Set localStorage for the clicked friend ID
            localStorage.setItem("friendID", userID);
            // Redirect to the profile page
            window.location = `profile.html?userID=${friend}`;
          });

          // Set the friend name in the card
          replaceFriendSpan.innerText = friend;

          // Append the card to the container
          futureEventsContainer.appendChild(card);
        });
      } else {
        console.log("No such document!");
      }
    })
    .catch(error => {
      console.error('Error getting document: ', error);
    });
}

// Call the function to display the cards
DisplayCards();
