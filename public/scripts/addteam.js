"use strict";
$(function () {

    // get data from JSON file for my dropdownlist
    getJSON();


    $("#addBtn").on("click", function () {
    $.post("/api/teams", $("#newTeam").serialize(), function (data) {

        data = JSON.parse(data);

        location.href = "details.html?TeamId=" + data.TeamId;

            })
        return false;
    }); 

});