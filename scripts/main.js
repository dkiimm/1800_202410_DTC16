function getNameFromAuth(){
  
firebase.auth().onAuthStateChanged(user=> {
  if (user){
    console.log(user.uid); //print the uid in the browser console
    console.log(user.displayName);  //print the user name in the browser console
    userName = user.displayName;

    document.getElementById('name-goes-here').innerText = user.displayName;
    //method #2:  insert using jquery
    // $("#name-goes-here").text(userName); //using jquery

  }else{

  }
})
  
}

getNameFromAuth();

function DisplayCards() {
  let cardTemplate = document.getElementById('event_template'); // Define cardTemplate

  db.collection('events').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {

        let card = cardTemplate.content.cloneNode(true);

        card.querySelector('#replace-sport').innerText = doc.data().sport;
        card.querySelector('#replace-skill').innerText = doc.data().skill; // Assuming 'skill' field exists in your data
        card.querySelector('#replace-location').innerText = doc.data().location;
        // card.querySelector('#replace-date').innerText = doc.data().date;
        console.log(doc.data().sport);
        console.log(doc.data().location);
        console.log(doc.data().date);

        document.getElementById('future-events').appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
}

DisplayCards();
