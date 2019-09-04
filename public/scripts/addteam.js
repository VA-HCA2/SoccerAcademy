"use strict";
$(function () {

    // get data from JSON file for my dropdownlist
    loadLeagueIntoDropdown("leaguesddl");

    // Hide div genders according to the league selected
    $("#leaguesddl").on("change", function(){
        let selected = $("#leaguesddl").val();
        let gender;

    // Loop to check genders

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

    $("#addBtn").on("click", function () {

        $("#errorTeam").show()

        let isvalidateTeam= validateFormTeam();

         if (isvalidateTeam == false)
         {
            return ;
         }

            
        $.post("/api/teams", $("#newTeam").serialize(), function (data) {
            data = JSON.parse(data);
            location.href = "details.html?TeamId=" + data.TeamId;
        })
        .fail(function (xhr, status, error) {
           // $("#errorTeam").html("Error: "+ xhr.status + " " + xhr.statusText)
           $("#errorTeam").html("Error: Team not added because of bad data")
        });
        return false;
    }); 

});

// Function to Validate forms
function validateFormTeam() {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let phonepattern= /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
    let errMsg = [];

    if ($("#leaguesddl").val() === null)
    {
        errMsg[errMsg.length] = "League is required";
    }

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