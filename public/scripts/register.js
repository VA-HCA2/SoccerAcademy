"use strict";
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("TeamId");

    // Get team name from api teams to generate in form 
    $.getJSON("api/teams/" + teamId, function (data) {
        $("#teamName").val(data.TeamName);
    });

    $("#error").hide();
    // On Click Function 
    $("#registerBtn").on("click", function () {
        $("#error").show();
        validateForm();
        // If data is entered post in the students table  
        $.post(`/api/teams/${teamId}/members`, $("#newPlayer").serialize(), function (data) {
            window.location.href = "details.html?TeamId=" + teamId;
        })

    }); // end of on click
}); // end of ready fuction

