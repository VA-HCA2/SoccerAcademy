// This script loads leagues in two different pages. On Leagues.js and addteam.js 
// Author:  Vanessa Arce 
"use strict";
// Function to populate dropdown for leagues 
let objs;
function loadLeagueIntoDropdown(dropdownid) {
    $.getJSON('/api/leagues', function (data) {

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
            mydropDownOption.appendTo("#" + dropdownid);
        }
    });
}



