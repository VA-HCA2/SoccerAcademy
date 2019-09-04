"use strict";
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("TeamId");
    let objs;

    // Get team name from api teams to generate in form 
    $.getJSON("api/teams/" + teamId, function (data) {

        objs=data;

        $("#teamName").val(data.TeamName);
        $("#gender").val(data.TeamGender);

        if (objs.Members.length >= objs.MaxTeamMembers )
        {
            $("#registerBtn").prop("disabled",true);
            $("#numOfPlayers").show();
            $("#numOfPlayers").html("Registration not allowed.Maximum Number of Players have been reach!");
        }
    });

    $("#error").hide();
    // On Click Function 

         // On Click Function 
    $("#registerBtn").on("click", function () {

        let isvalidate= validateForm(objs);

        if (isvalidate == false)
        {
            $("#error").show();
            return ;
        }
        // If data is entered post in the players table  
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


// Function to Validate data for Register Form 
function validateForm(objs) {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let phonepattern = /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
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
    else if (!phonepattern.test($("#phone").val().trim())) {
        errMsg[errMsg.length] = ("Phone enter a valid Phone Number");
    }

    if ($("#age").val().trim() == "") {
        errMsg[errMsg.length] = "Age is required";
    }

    else if(isNaN($("#age").val()) || $("#age").val() <= 0) {
        errMsg[errMsg.length] = "Please enter a valid Age";
    }

    else if( $("#age").val() < objs.MinMemberAge ){
        errMsg[errMsg.length] = "Player does not meet Minium Age requirements.Minimum Age required " +objs.MinMemberAge;
    }

    else if( $("#age").val() > objs.MaxMemberAge){
        errMsg[errMsg.length] = "Player does not meet Maximum Age requirements. Maximum Age required "+objs.MaxMemberAge;
    }

    if ($("input[name='gender']:checked").val() == null)
    {
        errMsg[errMsg.length] = "Gender is required";
    }
    
    else if ($("input[name='gender']:checked").val() != objs.TeamGender)
     {
            errMsg[errMsg.length]= "Player's Gender not allowed on this Team.";
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