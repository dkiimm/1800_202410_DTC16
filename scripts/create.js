
function displaySelectedSkill() {
  var selected = $(this).text();
  $("#select-skill .dropdown-toggle").text(selected);
  $("#select-skill .dropdown-toggle").val(selected);
}

function displaySelectedSport() {
  var selected = $(this).text();
  $("#select-sport .dropdown-toggle").text(selected);
  $("#select-sport .dropdown-toggle").val(selected);
}

function confirmCreateEvent() {
  var sport = $("#select-sport .dropdown-toggle").text();
  var date = $("#event_date").val();
  var time = $("#event_time").val();
  var skill = $("#select-skill .dropdown-toggle").text();
  var location = $("#event_location").val();
  var numPlayers = $("#event_participants").val();
  userID = firebase.auth().currentUser.uid;

  // Check if any of the input values are blank
  if (!sport || !date || !time || !skill || !location || !numPlayers) {
    alert("Enter All Fields");
    window.location.href = "create.html";
    return; // Exit the function early
  }

  var message = "Confirm Event:\nSport: " + sport + "\nDate: " + date + "\nStart Time: " + time + "\nSkill: " + skill + "\nLocation: " + location + "\nNumber of Players: " + numPlayers;
  var result = window.confirm(message);

  if (result) {
    // User clicked OK, proceed with event creation
    var eventRef = db.collection("events");
    var userID = firebase.auth().currentUser.uid;
    var host = db.collection("users").doc(userID).get()
    .then(doc => {
      if (doc.exists) {
        // Document exists, you can access its data using doc.data()
        var hostName = doc.data().name;
        console.log("Host name:", hostName);
        // Now you can use the hostName variable as needed

        eventRef.add({
          sport: sport,
          date: date,
          time: time,
          skill: skill,
          location: location,
          numPlayers: numPlayers,
          host: hostName,
          author: userID
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          // Optionally, you can redirect the user to another page or perform other actions here
          window.location.href = "profile.html";
          // window.location = "event.html?docID=" + ID;
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      } else {
        // Document does not exist
        console.log("No such document!");
      }
    });
  } else {
    // User clicked Cancel, do not proceed with event creation
    window.location.href = "create.html";
  }
}

function cancelCreate() {
  window.location.href = "main.html";
}

function setup() {
  $("#select-sport .dropdown-item").click(displaySelectedSport);
  $("#select-skill .dropdown-item").click(displaySelectedSkill);
  $("#create_event_button").off('click').click(confirmCreateEvent);
  $("#cancel_event_button").off('click').click(cancelCreate);
}

$(document).ready(setup);

