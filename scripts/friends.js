function DisplayCards(userID) {
  let cardTemplate = document.getElementById('event_template'); // Define cardTemplate
  let futureEventsContainer = document.getElementById('future-events');

  // Clear previous content
  futureEventsContainer.innerHTML = "";
  
  db.collection('users')
    .doc(userID) // Filter by the specified userID
    .get()
    .then(doc => {
      if (doc.exists) {
        let friends = doc.data().friends || []; // Get the friends array or an empty array if it doesn't exist

        // Iterate over each friend in the friends array
        friends.forEach(friend => {
          let card = cardTemplate.content.cloneNode(true);

          // Add event listener to the card button
          card.querySelector('#event-card').addEventListener("click", () => {
            // Set localStorage for the clicked friend ID
            localStorage.setItem("friendID", userID);
            // Redirect to the profile page
            window.location = "profile.html?userID="+ friend;
          });

          // Set the friend name in the card
          card.querySelector('#replace-friend').innerText = friend;

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
