"use strict";
$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");

  // Get information with the course Id of the selected course.
  $.getJSON("api/teams/" + TeamId, function (data) {
    let teams; // like obj
    teams = data;
   
    // Get the value for each field
    $("#teamid").val(TeamId);
    $("#leaguecode").val(teams.League);
    $("#teamName").val(teams.TeamName);
    $("#managername").val(teams.ManagerName);
    $("#managerphone").val(teams.ManagerPhone);
    $("#manageremail").val(teams.ManagerEmail);
    $("#teammembers").val(teams.MaxTeamMembers);
    $("#minmemberage").val(teams.MinMemberAge);
    $("#maxmemberage").val(teams.MaxMemberAge);
    $("#teamgender").val(teams.TeamGender);
  }); // end of get JSON

  $("#editBttn").on("click", function () {
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
}); // end of ready fuction


