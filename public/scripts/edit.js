"use strict";
$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");
  let teams; 

  $.getJSON("api/teams/" + TeamId, function (data) {
    teams = data;
    loadTeamData(teams);
   
  }); // end of get JSON

  $("#errorTeam").hide();

  $("#resetBtn").on("click", function () {

    loadTeamData(teams)
 });

  $("#editBttn").on("click", function () {

    let isvalidateTeam= validateFormTeam();

     if (isvalidateTeam == false)
     {
        $("#errorTeam").show()
        return ;
     }
     
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

  $("#returnBtn").on("click", function () {

    window.location.href = "details.html?TeamId=" + TeamId;
  });
  
}); // end of ready fuction


function loadTeamData(teams){

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
function validateFormTeam() {
  let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  let phonepattern= /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
  let errMsg = [];

  $("#errorTeam").hide()

  if ($("#teamName").val().trim() == "") {
      errMsg[errMsg.length] = "Team Name is required";
  }

  if ($("#managername").val().trim() == "") {
      errMsg[errMsg.length] = "Manager name is required";
  }

  if ($("#manageremail").val().trim() == "") {
      errMsg[errMsg.length] = "Manager E-mail is required";
  }
  else if (!pattern.test($("#manageremail").val().trim())) {
      errMsg[errMsg.length] = ("Please enter a valid Email-Address field");
  }

  if ($("#teammembers").val().trim() == "") {
      errMsg[errMsg.length] = "Number of players is required";
  }

  if ($("#managerphone").val().trim() == "") {
      errMsg[errMsg.length] = "Phone Number is required";
  }
  else if (!phonepattern.test($("#managerphone").val().trim())){
      errMsg[errMsg.length] = ("Phone enter a valid Phone Number");
  }

  if ($("#minmemberage").val().trim() == "") {
      errMsg[errMsg.length] = " Minimum age is required";
  }

  else if ($("#minmemberage").val() <= 0) {
      errMsg[errMsg.length] = "Minimum age must be greater than 0";
  }

  // Max age validation 

  if ($("#maxmemberage").val().trim() == "") {
      errMsg[errMsg.length] = "Maximum age is required";
  }

  $("#errorTeam").empty();
  for (let i = 0; i < errMsg.length; i++) {
      $("<li>" + errMsg[i] + "</li>").appendTo("#errorTeam");
  }
 
  if (errMsg.length >0){
      return false
  }

 return true;

}