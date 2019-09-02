// Onload function
"use strict";
$(function () {
  let leaguesObjs;
  let obj;

 getLeagues();
 showAllFunction();
 getTeams();
 searchByGender();
 
  $("#searchLeagues").on("click",function(){

    $(".leaguesdiv").show();
    $(".teamsdiv").hide();
    $(".genderdiv").hide();
  });

  $("#searchTeams").on("click",function(){
    $(".teamsdiv").show()
    $(".leaguesdiv").hide()
    $(".genderdiv").hide()
    
  });

  $("#searchGender").on("click",function(){
    $(".genderdiv").show()
    $(".leaguesdiv").hide()
    $(".teamsdiv").hide()
  })

});

function getLeagues(leaguesObjs){
 
  // Call function to get data from JSON file to populate dropdown list of leagues
    loadLeagueIntoDropdown("leaguesddl");

  // Onchange function to filter teams by leagues 
  $("#leaguesddl").change(function () {
 
    // Clear my table header and table body when user selects another league
    $("#teamTable").empty();
    $("#teamHeader").empty();
    $.getJSON("/api/teams/byleague/" + $("#leaguesddl").val(), function (data) {

      leaguesObjs = data;
      // Call my create a header function
      createHeader()
      // Call create table function
      getTable(leaguesObjs);

    }); // end of get JSON
  }); //End of my onchange function  
}

function getTeams(leaguesObjs){
  let obj;

  // dropdown for teams 
  $.getJSON("/api/teams", function(data){
    obj = data;
      // Create my dropdown information from api/leagues
      for (let i = 0; i < obj.length; i++) {
       let text = obj[i].TeamName;
        let value = obj[i].TeamId;
        let teamddl = $("<option>",
          {
            value: value,
            text: text
          });
        teamddl.appendTo("#teamddl");
      }
  });

 
  $("#teamddl").change(function () {
  
    $("#teamTable").empty();
    $("#teamHeader").empty();

  $.getJSON("/api/teams/" + $("#teamddl").val(), function (data) {

    leaguesObjs = data;
  
    // Call my create a header function
    createHeader()
      //Table Body
        let str = "<tr><td>" + leaguesObjs.TeamName + "</td><td>" + leaguesObjs.ManagerName + "</td><td>"
        + leaguesObjs.ManagerPhone + "</td><td>" + "<a href=details.html?TeamId=" + leaguesObjs.TeamId + ">Details<a>" + "</td><td>"
        + "<a href=edit.html?TeamId=" + leaguesObjs.TeamId + ">Edit<a></td></tr>";

        $("#teamTable").append(str);

    }); // end of get JSON
  });
}


//Function for search by gender 

function searchByGender(leaguesObjs,obj){

  // dropdown for teams 
  $.getJSON("/api/teams", function(data){
    obj = data;
 
      // Create my dropdown information from api/leagues
      for (let i = 0; i < obj.length; i++) {
  
       let text = obj[i].TeamGender;
        let value = obj[i].TeamId;
        let teamddl = $("<option>",
          {
            value: value,
            text: text
          });         
        teamddl.appendTo("#genderddl");    
        }  
      }); 

     
  $("#genderddl").change(function () {
  
    $("#teamTable").empty();
    $("#teamHeader").empty();

  $.getJSON("/api/teams/" + $("#genderddl").val(), function (data) {

    leaguesObjs = data;
  
    // Call my create a header function
    createHeader()
      //Table Body
        let str = "<tr><td>" + leaguesObjs.TeamName + "</td><td>" + leaguesObjs.ManagerName + "</td><td>"
        + leaguesObjs.ManagerPhone + "</td><td>" + "<a href=details.html?TeamId=" + leaguesObjs.TeamId + ">Details<a>" + "</td><td>"
        + "<a href=edit.html?TeamId=" + leaguesObjs.TeamId + ">Edit<a></td></tr>";

        $("#teamTable").append(str);

    }); // end of get JSON
  });
}



// Show all function 
 function showAllFunction(leaguesObjs){
  $("#showAll").on("click", function () {
    // Clear my table header and table 
    $("#teamTable").empty();
    $("#teamHeader").empty();
    $.getJSON("/api/teams", function (data) {
      leaguesObjs = data;
      // Call create header function
      createHeader()
      // Call create table function
      getTable(leaguesObjs);
    }); // end of get JSON
  });
 }


// Function create a Header
function createHeader() {
  let teamHeader = $(
    "<tr><th>Team Name</th><th>Manager</th><th>Phone Number</th><th>&nbsp;</th><th>&nbsp;</th></tr>")
  $("#teamHeader").append(teamHeader);
}

// Function create table body 

function getTable(leaguesObjs){
  for (let i = 0; i < leaguesObjs.length; i++) {

    //Table Body
    let str = "<tr><td>" + leaguesObjs[i].TeamName + "</td><td>" + leaguesObjs[i].ManagerName + "</td><td>"
      + leaguesObjs[i].ManagerPhone + "</td><td>" + "<a href=details.html?TeamId=" + leaguesObjs[i].TeamId + ">Details<a>" + "</td><td>"
      + "<a href=edit.html?TeamId=" + leaguesObjs[i].TeamId + ">Edit<a></td></tr>";

    $("#teamTable").append(str);
}
}

