
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

  var message = "Are you sure you want to create an event for " + sport + " on " + date + " at " + time + " for " + skill + " players at " + location + " for " + numPlayers + " players?";
  var result = window.confirm(message);

  if (result) {
    // User clicked OK, proceed with event creation
    window.location.href = "main.html";
  } else {
    // User clicked Cancel, do not proceed with event creation
    window.location.href = "create.html";
  }
  
}

function setup() {
  $("#select-sport .dropdown-item").click(displaySelectedSport);
  $("#select-skill .dropdown-item").click(displaySelectedSkill);
  $("#create_event_button").click(confirmCreateEvent);
}

$(document).ready(setup);