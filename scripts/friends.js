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
        let card = cardTemplate.content.cloneNode(true);

        // Add event listener to the card button
        card.querySelector('#event-card').addEventListener("click", () => {
          // Later add functionality to get data from the specific event
          window.location = "profile.html?userID=" + localStorage.getItem("friendID");
          
        });

        // Set the sport text in the card
        card.querySelector('#replace-friend').innerText = doc.data().friend;

        // Append the card to the container
        futureEventsContainer.appendChild(card);
      } else {
        console.log("No such document!");
      }
    })
    .catch(error => {
      console.error('Error getting document: ', error);
    });
}

function goToFriendProfile(){
  document.querySelector('button').addEventListener('click', () => {
    window.location = "profile.html?userID=" + localStorage.getItem("friendID");
  })
}