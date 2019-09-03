"use strict";
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("TeamId");
    let objs;
    // Get team name from api teams to generate in form 
    $.getJSON("api/teams/" + teamId, function (data) {
        objs=data;

        $("#teamName").val(data.TeamName);
    });

    $("#error").hide();
    // On Click Function 
    $("#registerBtn").on("click", function () {

        let isvalidate= validateForm();

        if (isvalidate == false)
        {
            $("#error").show();
            return ;
        }
        // If data is entered post in the students table  
        $.post(`/api/teams/${teamId}/members`, $("#newPlayer").serialize(), function (data) {
            window.location.href = "details.html?TeamId=" + teamId;
        })

    }); // end of on click

    // Reset button prevent default for Team name 
    $("#resetBtn").on("click", function (e) {
        e.preventDefault();
        $("#teamName").val(objs.TeamName);
        $("#memberName").val("");
        $("#contactName").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#age").val("");
        $("#gender").val("Male");
    });
   

    $("#returnBtn").on("click", function () {

        window.location.href = "details.html?TeamId=" + teamId;
    });
}); // end of ready fuction


