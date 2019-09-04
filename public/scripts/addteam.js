// This page Adds a team to a selected League. 
// Author: Vanessa Arce
"use strict";
$(function () {

    // get data from JSON file for my dropdownlist
    loadLeagueIntoDropdown("leaguesddl");

    // Hide div genders according to the league selected
    $("#leaguesddl").on("change", function(){
        let selected = $("#leaguesddl").val();
        let gender;

    // Loop to check genders and hide radio buttons depeding on the league selected. 

       for ( let i=0; i < objs.length; i++){
           
           if(selected==objs[i].Code)
           {
               gender=objs[i].Gender;
           }
       }
    // Check for Male Gender 
        if (gender=="Male")
        {
            $(".malediv").show()
            $("#male").prop("checked", true)
            $("#female").prop("checked", false)
            $(".femalediv").hide()
            $(".anydiv").hide()
        }
    // Check for Female Gender 
        
        if (gender=="Female")
        {
            $(".femalediv").show()
            $("#female").prop("checked", true)
            $("#male").prop("checked", false)
            $(".malediv").hide()
            $(".anydiv").hide()
        }

        else if (gender=="Any")
        {
            $(".malediv").show()
            $(".femalediv").show()
            $(".anydiv").show()
        }
        return;
       
    })

    $("#errorTeam").hide()
    
    // On click to add New Team 

    $("#addBtn").on("click", function () {

        $("#errorTeam").show()
    
    // Call my validate form. 
        let isvalidateTeam= validateFormTeam();

         if (isvalidateTeam == false)
         {
            return ;
         }

    // If data passes validation post new team 

        $.post("/api/teams", $("#newTeam").serialize(), function (data) {
            data = JSON.parse(data);
    // Return to team details. 
            location.href = "details.html?TeamId=" + data.TeamId;
        })
        .fail(function (xhr, status, error) {
    // Server error 
           $("#errorTeam").html("Error: Team not added because of bad data")
        });
        return false;
    }); 
    
    // Reset button click event 
    $("#resetBtn").on("click", function () {
        $("#errorTeam").hide()
    });

});

// Function to Validate forms
function validateFormTeam() {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let phonepattern= /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
    let errMsg = [];

// Validate League is nothhing is selected 
    if ($("#leaguesddl").val() === null)
    {
        errMsg[errMsg.length] = "League is required";
    }
// Validate Team Name 
    if ($("#teamName").val().trim() == "") {
        errMsg[errMsg.length] = "Team Name is required";
    }
// Validate Manager Name 
    if ($("#managername").val().trim() == "") {
        errMsg[errMsg.length] = "Manager name is required";
    }
// Validate E-mail 
    if ($("#manageremail").val().trim() == "") {
        errMsg[errMsg.length] = "Manager E-mail is required";
    }
// Validate E-mail with Regular Expressions.     
    else if (!pattern.test($("#manageremail").val().trim())) {
        errMsg[errMsg.length] = ("Please enter a valid Email-Address field");
    }
// Validate num of players if nothing is entered. 
    if ($("#teammembers").val().trim() == "") {
        errMsg[errMsg.length] = "Number of players is required";
    }
// Validate if the num of players is not a number or if it is equal or less than 0     
    else if (isNaN($("#teammembers").val()) || Number($("#teammembers").val()) <= 0){
        errMsg[errMsg.length] = "Please enter a number of Players ";
        }
// Validate Phone number. 
    if ($("#managerphone").val().trim() == "") {
        errMsg[errMsg.length] = "Phone Number is required";
    }
// Validate phone number with Regular Expressions.       
    else if (!phonepattern.test($("#managerphone").val().trim())){
        errMsg[errMsg.length] = ("Phone enter a valid Phone Number");
    }
// Validate Minimum Age   
    if ($("#minmemberage").val().trim() == "") {
        errMsg[errMsg.length] = " Minimum age is required";
    } 
    else if (isNaN($("#minmemberage").val()) || Number($("#minmemberage").val()) <= 0){
     errMsg[errMsg.length] = "Please enter a valid Minimum Age ";
     }

    
// Maximum Age validation 

    if ($("#maxmemberage").val().trim() == "") {
        errMsg[errMsg.length] = "Maximum age is required";
    }

    else if (Number($("#maxmemberage").val()) < Number($("#minmemberage").val())) {
        errMsg[errMsg.length] = "Maximum age must not be less than Minimum Age. ";
    }

    else if (isNaN($("#maxmemberage").val())){
        errMsg[errMsg.length] = "Maximum Age must be a number";
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