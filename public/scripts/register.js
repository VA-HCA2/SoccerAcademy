"use strict";
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("TeamId");

    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    // Get team name from api teams to generate in form 
    $.getJSON("api/teams/" + teamId, function (data) {
        $("#teamName").val(data.TeamName);
    });

    // On Click Function 
    $("#registerBtn").on("click", function () 
    {
        validateForm();
        // If data is entered post in the students table  
        $.post(`/api/teams/${teamId}/members`, $("#newPlayer").serialize(), function (data) {
            window.location.href = "details.html?TeamId=" + teamId;
        })
    }); // end of on click
}); // end of ready fuction

function validateForm() {
    let errMsg = [];

    if ($("#memberName").val().trim() == "") {
        errMsg[errMsg.length] = "Name is required";
    }

    if ($("#contactName").val().trim() == "") {
        errMsg[errMsg.length] = "Contact name is required";
    }


    if ($("#email").val().trim() == "") {
        errMsg[errMsg.length] = "Email is required";
    }


    if ($("#phone").val().trim() == "") {
        errMsg[errMsg.length] = "Phone Number is required";
    }

    if ($("#age").val().trim() == "") {
        errMsg[errMsg.length] = "Age is required";
    }

    $("#error").empty();
    for (let i = 0; i < errMsg.length; i++) {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#error"));
    }
    return false;
}