var filter = ""

function filterClick(event) {
    window.location = "main.html"
    //Later change order of the events to match current filter (needs code in main.js)
    filter = event.data.filter
    console.log("Current filter: " + filter)
}

function setup() {
    $("#filter-sport").click({ filter: "sport" }, filterClick)
    $("#filter-location").click({ filter: "location" }, filterClick)
    $("#filter-skill").click({ filter: "skill" }, filterClick)
    $("#filter-host").click({ filter: "host" }, filterClick)
}

$(document).ready(setup)