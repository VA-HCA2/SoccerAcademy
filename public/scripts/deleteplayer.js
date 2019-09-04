// This page deletes a listed player. 
// Author: Vanessa Arce
"use strict";
$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");
  let email = urlParams.get("email");
  let teamname = urlParams.get("TeamName");
  let name = urlParams.get("membername");
  let memberid = urlParams.get("MemberId");

  // Get the value for each field
  $("#teamid").val(TeamId);
  $("#memberid").val(memberid);
  $("#email").val(email);
  $("#teamName").val(teamname);
  $("#memberName").val(name);

  // Delete button click event 
  $("#deleteBtn").on("click", function () {
    $.ajax({
      url: `/api/teams/${TeamId}/members/${memberid}`,
      method: 'Delete',
      success: function () {
        window.location.href = "details.html?TeamId=" + TeamId;
      }
    })
  });
// Retun button click event 
  $("#returnBtn").on("click", function () {
    window.location.href = "details.html?TeamId=" + TeamId;
  });
}); // end of ready fuction
