"use strict";
$(function () {
 
  // get data from JSON file for my dropdownlist
    getJSON();

});

$.post("/api/teams", $("#newTeam").serialize(), function(data) {

data = JSON.parse(data);

location.href = "teamdetails.html?teamid=" + data.TeamId;

});

// end of post

