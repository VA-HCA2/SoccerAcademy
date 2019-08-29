// Onload function
"use strict";
$(function () {
    let objs;
    let leaguesObjs;
    // get data from JSON file
    $.getJSON('/api/leagues', function (data) {
     objs = data;
    // Create my dropdown information from api/categories
    for (let i = 0; i < objs.length; i++) {
      let text = objs[i].Name;
      let value = objs[i].Code;
      let mydropDownOption = $("<option>", {
        value: value,
        text: text
      });
      mydropDownOption.appendTo("#leaguesddl");
    }
    });
  // Onchange function
  $("#leaguesddl").change(function () {
    // Clear my table header and table body when the student selects another course. 
    $("#teamTable").empty();
    $("#teamHeader").empty();
    $.getJSON("/api/teams/byleague/" + $("#leaguesddl").val(), function (data) {
      
      leaguesObjs = data;

      //Table header starts
      let teamsHeader = $(
        "<tr><th>Team Name</th><th>Manager</th><th>Phone Number</th><th>&nbsp;</th><th>&nbsp;</th></tr>");

      $("#teamHeader").append(teamsHeader);
      // End of table header

      for (let i = 0; i < leaguesObjs.length; i++) {

        //Table Body
        let str = "<tr><td>" + leaguesObjs[i].TeamName + "</td><td>" + leaguesObjs[i].ManagerName+ "</td><td>"
         + leaguesObjs[i].ManagerPhone+ "</td><td>"+"<a href=details.html?TeamId=" + leaguesObjs[i].TeamId + ">Details<a>" + "</td><td>"
          +"<a href=edit.html?TeamId="+ leaguesObjs[i].TeamId + ">Edit<a></td></tr>";

        $("#teamTable").append(str);

      }//End of body table
    }); // end of get JSON
  }); //End of my onchange function  
     
});



