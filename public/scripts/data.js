"use strict";
// Function to populate dropdown for leagues 
let objs;
function loadLeagueIntoDropdown(dropdownid){
    $.getJSON('/api/leagues', function (data)
    {
   
      objs = data;
      // Create my dropdown information from api/leagues
      for (let i = 0; i < objs.length; i++) {
        let text = objs[i].Name;
        let value = objs[i].Code;
        let mydropDownOption = $("<option>",
          {
            value: value,
            text: text
          });
        mydropDownOption.appendTo("#"+dropdownid);
      }
    });
}

// Function to Validate data for Register Form 
function validateForm() {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let phonepattern= /^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/
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
    else if (!phonepattern.test($("#phone").val().trim())){
        errMsg[errMsg.length] = ("Phone enter a valid Phone Number");
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

