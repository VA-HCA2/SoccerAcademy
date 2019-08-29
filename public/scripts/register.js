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

function validateForm() {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
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
    else if (!pattern.test($("#email").val().trim())) {
        errMsg[errMsg.length] = ("Please enter a valid Email-Address field");
    }

    if ($("#phone").val().trim() == "") {
        errMsg[errMsg.length] = "Phone Number is required";
    }

    if ($("#age").val().trim() == "") {
        errMsg[errMsg.length] = "Age is required";
    }

    else if ($("#age").val() <= 0) {
        errMsg[errMsg.length] = "Age must be greater than 0";
    }

    $("#error").empty();
    for (let i = 0; i < errMsg.length; i++) {
        $("<li>" + errMsg[i] + "</li>").appendTo("#error");
    }
    return false;
}