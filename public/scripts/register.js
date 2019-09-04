// This page registers players to a team. 
// Author: Vanessa Arce
// Onload function
"use strict";
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("TeamId");
    let objs;

    // Get team name from api teams to generate in form 
    $.getJSON("api/teams/" + teamId, function (data) {

        objs = data;
        // Populate information 
        $("#teamName").val(data.TeamName);
        // Check if max number of players have been reach.
        if (objs.Members.length >= objs.MaxTeamMembers) {
            // If it's over hide registration button and show message. 
            $("#registerBtn").hide();
            $("#numOfPlayers").show();
            $("#numOfPlayers").html("Registration not allowed.Maximum Number of Players have been reach!");
        }
    });
    // Hide error 
    $("#error").hide();

    // On Click Function 
    $("#registerBtn").on("click", function () {
        // Call validate function 
        let isvalidate = validateForm(objs);

        if (isvalidate == false) {
            $("#error").show();
            return;
        }
        // If data is entered post in the players table  
        $.post(`/api/teams/${teamId}/members`, $("#newPlayer").serialize(), function (data) {
            window.location.href = "details.html?TeamId=" + teamId;
        })

    }); // end of on click

    // Reset button prevent default for Team name 
    $("#resetBtn").on("click", function (e) {
        $("#error").hide();
        e.preventDefault();
        $("#teamName").val(objs.TeamName);
        $("#memberName").val("");
        $("#contactName").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#age").val("");
        $("#gender").val("Male");
    });

    // Reset button on click event. 
    $("#returnBtn").on("click", function () {

        window.location.href = "details.html?TeamId=" + teamId;
    });
}); // end of ready fuction


// Function to Validate data for Register Form 
function validateForm(objs) {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let phonepattern = /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
    let errMsg = [];
    // Validate if the name field is empty. 
    if ($("#memberName").val().trim() == "") {
        errMsg[errMsg.length] = "Name is required";
    }
    // Validate if contact field is empty. 
    if ($("#contactName").val().trim() == "") {
        errMsg[errMsg.length] = "Contact name is required";
    }
    // Validate if the email field is empty. 
    if ($("#email").val().trim() == "") {
        errMsg[errMsg.length] = "Email is required";
    }
    // Validate with reg expressions.  
    else if (!pattern.test($("#email").val().trim())) {
        errMsg[errMsg.length] = ("Please enter a valid Email-Address field");
    }
    // Validate phone number. 
    if ($("#phone").val().trim() == "") {
        errMsg[errMsg.length] = "Phone Number is required";
    }
    // Validate phone with reg expressions. 
    else if (!phonepattern.test($("#phone").val().trim())) {
        errMsg[errMsg.length] = ("Enter a valid Phone Number");
    }
    // Validate if age is empty. 
    if ($("#age").val().trim() == "") {
        errMsg[errMsg.length] = "Age is required";
    }
    // Validate if age is not a number or if it's less than 0.   
    else if (isNaN($("#age").val()) || Number($("#age").val() <= 0)) {
        errMsg[errMsg.length] = "Please enter a valid Age";
    }
    // Validate if age is player doesn't meet min age requirements. 
    else if ($("#age").val() < objs.MinMemberAge) {
        errMsg[errMsg.length] = "Player does not meet Minium Age requirements.Minimum Age required " + objs.MinMemberAge;
    }
    // Validate if age is player doesn't meet max age requirements. 
    else if ($("#age").val() > objs.MaxMemberAge) {
        errMsg[errMsg.length] = "Player does not meet Maximum Age requirements. Maximum Age required " + objs.MaxMemberAge;
    }
    // Validate if Gender is not selected.  
    if ($("input[name='gender']:checked").val() == null) {
        errMsg[errMsg.length] = "Gender is required";
    }
    // Validate if Gender is not equal to the team requirements. 
    if (($("input[name='gender']:checked").val() != objs.TeamGender)){
        errMsg[errMsg.length] = "Player's Gender not allowed on this Team."
    }
    else if (($("input[name='gender']:checked").val() != objs.TeamGender) && ($("input[name='gender']:checked").val() == null)) {
        if ($("input[name='gender']:checked").val() != "Any") {
            errMsg[errMsg.length] = "Player's Gender not allowed on this Team.";
        }
    }


    $("#error").empty();
    for (let i = 0; i < errMsg.length; i++) {
        $("<li>" + errMsg[i] + "</li>").appendTo("#error");
    }

    if (errMsg.length > 0) {
        return false
    }
    return true;
}