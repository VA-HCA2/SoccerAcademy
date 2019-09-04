// This page edits the information of a listed team. 
// Author: Vanessa Arce
"use strict";
$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");
  let teams;
  let checkMinAge=1000;
  let checkMaxAge=0;

  $.getJSON("api/teams/" + TeamId, function (data) {
    teams = data;
    loadTeamData(teams);
    
  // For loop to compare min and max age.   
     for ( let i = 0; i < teams.Members.length; i++){
      if (teams.Members[i].Age < checkMinAge)
      {
        checkMinAge=teams.Members[i].Age
      }

      if (teams.Members[i].Age > checkMaxAge)
      {
        checkMaxAge=teams.Members[i].Age
      }
    }

  }); // end of get JSON

  $("#errorTeam").hide();

  // Reset button reset click event 
  $("#resetBtn").on("click", function () {

  // Load to original values when the reset button is clicked. 
    loadTeamData(teams)
  });

  // Edit button click event 
  $("#editBttn").on("click", function () {

  // Call my validate form 
    let isvalidateTeam = validateFormTeam(teams,checkMinAge,checkMaxAge);

    if (isvalidateTeam == false) {
      $("#errorTeam").show()
      return;
    }
  // Edit if the values are correct 
    $.ajax({
      url: '/api/teams',
      data: $("#editTeam").serialize(),
      method: 'PUT',
      success: function () {
        alert("Updated");
        window.location.href = "details.html?TeamId=" + TeamId;
      }
    });
  });

  // Return button click event 
  $("#returnBtn").on("click", function () {

    window.location.href = "details.html?TeamId=" + TeamId;
  });

}); // end of ready fuction

// Load values on the fields when 

function loadTeamData(teams) {

  $("#teamid").val(teams.TeamId);
  $("#leaguecode").val(teams.League);
  $("#teamName").val(teams.TeamName);
  $("#managername").val(teams.ManagerName);
  $("#managerphone").val(teams.ManagerPhone);
  $("#manageremail").val(teams.ManagerEmail);
  $("#teammembers").val(teams.MaxTeamMembers);
  $("#minmemberage").val(teams.MinMemberAge);
  $("#maxmemberage").val(teams.MaxMemberAge);
  $("#teamgender").val(teams.TeamGender);
}


// Function to Validate forms
function validateFormTeam(teams,checkMinAge,checkMaxAge) {
  let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  let phonepattern = /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
  let errMsg = [];

  $("#errorTeam").hide()
// Validate if Name is not entered 
  if ($("#teamName").val().trim() == "") {
    errMsg[errMsg.length] = "Team Name is required";
  }
// Validate if manager name is not entered 
  if ($("#managername").val().trim() == "") {
    errMsg[errMsg.length] = "Manager name is required";
  }
// Validate if email is not entered 
  if ($("#manageremail").val().trim() == "") {
    errMsg[errMsg.length] = "Manager E-mail is required";
  }
// Validate email with reg expressions.   
  else if (!pattern.test($("#manageremail").val().trim())) {
    errMsg[errMsg.length] = ("Please enter a valid Email-Address field");
  }
// Validate if the number of players is empty. 
  if ($("#teammembers").val().trim() == "") {
    errMsg[errMsg.length] = "Number of players is required";
  }
// Validate if the number of players to be edited is less than the excisting number of players 
  else if ($("#teammembers").val() < teams.Members.length) {
    errMsg[errMsg.length] = "Maximum Number of players not allowed. There are more players already registered on that Team";
  }
// Validate if phone number is not entered. 
  if ($("#managerphone").val().trim() == "") {
    errMsg[errMsg.length] = "Phone Number is required";
  }
 // Validate phone number with reg expressions.  
  else if (!phonepattern.test($("#managerphone").val().trim())) {
    errMsg[errMsg.length] = ("Phone enter a valid Phone Number");
  }
// Validate if min age is empty 
  if ($("#minmemberage").val().trim() == "") {
    errMsg[errMsg.length] = " Minimum age is required";
  }
// Validate if min age is not a number or if it's less than 0. 
  else if (isNaN($("#minmemberage").val()) || Number($("#minmemberage").val() <= 0)) {
    errMsg[errMsg.length] = "Please enter a valid Age";
  }
// Validate  min age to be edited depeding on the age of an existing player 
  else if ( Number($("#minmemberage").val()) > checkMinAge ) {
    errMsg[errMsg.length] = "Existing team players don't meet Minimum Member Age. Youngest player is "+checkMinAge;
  }

  // Max Age Validation 
  //Validate if max age is empty. 
  if ($("#maxmemberage").val().trim() == "") {
    errMsg[errMsg.length] = " Maximum age is required";
  }
  // Validate if max age is not a number or if is less than 0. 
  else if (isNaN($("#maxmemberage").val()) || Number($("#maxmemberage").val() <= 0)) {
    errMsg[errMsg.length] = "Please enter a valid Age";
  }
 // Validate  max age to be edited depeding on the age of an existing player 
  else if ( Number($("#maxmemberage").val()) < checkMaxAge ) {
    errMsg[errMsg.length] = "Existing team players don't meet Maximum Member Age. Older player is "+checkMaxAge;
  }

  $("#errorTeam").empty();
  for (let i = 0; i < errMsg.length; i++) {
    $("<li>" + errMsg[i] + "</li>").appendTo("#errorTeam");
  }

  if (errMsg.length > 0) {
    return false
  }

  return true;

}