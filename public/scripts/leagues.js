// Onload function
"use strict";
$(function () {
  let objs;
  let leaguesObjs;
  // get data from JSON file
  $.getJSON('/api/leagues', function (data) {
    objs = data;
    // Create my dropdown information from api/leagues
    for (let i = 0; i < objs.length; i++) {
      let text = objs[i].Name;
      let value = objs[i].Code;
      let mydropDownOption = $("<option>",
        {
          value: value,
          text: text
        });
      mydropDownOption.appendTo("#leaguesddl");
    }
  });
  // Onchange function
  $("#leaguesddl").change(function () 
  {
    // Clear my table header and table body when user selects another league
    $("#teamTable").empty();
    $("#teamHeader").empty();
    $.getJSON("/api/teams/byleague/" + $("#leaguesddl").val(), function (data) {

      leaguesObjs = data;
      // Call my create a header function
      createHeader()
      for (let i = 0; i < leaguesObjs.length; i++) {

        //Table Body
        let str = "<tr><td>" + leaguesObjs[i].TeamName + "</td><td>" + leaguesObjs[i].ManagerName + "</td><td>"
          + leaguesObjs[i].ManagerPhone + "</td><td>" + "<a href=details.html?TeamId=" + leaguesObjs[i].TeamId + ">Details<a>" + "</td><td>"
          + "<a href=edit.html?TeamId=" + leaguesObjs[i].TeamId + ">Edit<a></td></tr>";

        $("#teamTable").append(str);

      }//End of body table
    }); // end of get JSON
  }); //End of my onchange function  

  $("#showAll").on("click", function () {
    // Clear my table header and table 
    $("#teamTable").empty();
    $("#teamHeader").empty();
    $.getJSON("/api/teams", function (
      data
    ) {
      leaguesObjs = data;

      createHeader()

      for (let i = 0; i < leaguesObjs.length; i++) {

        //Table Body
        let str = "<tr><td>" + leaguesObjs[i].TeamName + "</td><td>" + leaguesObjs[i].ManagerName + "</td><td>"
          + leaguesObjs[i].ManagerPhone + "</td><td>" + "<a href=details.html?TeamId=" + leaguesObjs[i].TeamId + ">Details<a>" + "</td><td>"
          + "<a href=edit.html?TeamId=" + leaguesObjs[i].TeamId + ">Edit<a></td></tr>";

        $("#teamTable").append(str);

      }//End of body table
    }); // end of get JSON
  });
});

// Function create a Header
function createHeader() {
  let teamHeader = $(
    "<tr><th>Team Name</th><th>Manager</th><th>Phone Number</th><th>&nbsp;</th><th>&nbsp;</th></tr>")
  $("#teamTable").append(teamHeader);
}



