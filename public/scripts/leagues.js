// Onload function
"use strict";
$(function () {

    // get data from JSON file
    $.getJSON('/api/leagues', function (data)
    {
        // Create my category list dropdown
        $.each(data, function (index,info ) {
            $('#categoryList').append($('<a/>')
                .attr('class', 'dropdown-item')
                .text(info.Name)
                .attr('href', '#')
                .on('click', function (e) {
                    e.preventDefault();
                    $('#categoryName').text(info.Name);
                    getTeams(info.Code);
            }));
        });
    });
});


// Get Teams function 
function getTeams(info) {
    // Fade effect
    $('#serviceCard').hide('');
    $("#serviceList").html('');
  // get data from JSON file
    $.getJSON(`/api/teams/byleague/${info}`, (teamLeague) => {
        // Create 
        $.each(teamLeague, (index, team) => {
            $('#serviceList').append($('<li />')
                .text(team.TeamName)
                .attr("class", "list-group-item list-group-item-action")
                .on('click', function (e) {
                    e.preventDefault();
                    getTeamInfo(team.TeamId);
                }));
        });
    });
    $('#servicesContainer').show();
}

// Function for cards 
function getTeamInfo(teamid) {
    $.getJSON(`/api/teams/${teamid}`, (team) => {
        $('#cardTitle').html(team.TeamName);
        $('#cardText1').html("Manager Name: "+team.ManagerName);
        $('#cardText2').html("Phone number: "+team.ManagerPhone);
        $('#cardText3').html("Email: "+team.ManagerEmail);
        $('#cardText4').html("Max team players : "+team.MaxTeamMembers);
        $('#cardText5').html("Minimum Age : "+team.MinMemberAge);
        $('#cardText6').html("Maximum Age : "+team.MaxMemberAge);
        $('#serviceCard').show();
    });

}
