// This page lists the details on a page. 
// Author: Vanessa Arce
"use strict";
$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");
    let obj;

    // Get information with the Team Id of the selected team.
    $.getJSON("api/teams/" + TeamId, function (data) {
        obj = data;
        teamDetails(obj)
        playersDetails(obj, TeamId)
        $("#registerButton").attr("href", "register.html?TeamId=" + TeamId);
        $("#registerButton").on("click", function () {
            document.location.href = "register.html?TeamId=" + TeamId;
        });
    });

}); // end of ready fuction

//Table Body function 
function teamDetails(obj) {
    let details =
        "<tr><td colspan='2' class='text-center font-weight-bold text-uppercase'>" + obj.TeamName + "</td></tr>" + // Second Row
        "<tr><td class='font-weight-bold'> League: </td><td>" + obj.League + "</td></tr>" +
        "<tr><td class='font-weight-bold'> Manager Information: </td><td>" +
        obj.ManagerName + '<br>' + obj.ManagerPhone + '<br>' + obj.ManagerEmail + "</td></t>" +
        "<tr><td class='font-weight-bold'> Team Rules: </td><td>" +
        'Ages ' + obj.MinMemberAge + '-' + obj.MaxMemberAge + '<br>' + 'Number of Players ' + obj.MaxTeamMembers + "</td></t>" +
        "<tr><td class='font-weight-bold'> Team Gender:</td><td>" +
        obj.TeamGender + "</td></tr>";

    $("#detailsTable").append(details);

}

// Table for Players function 
function playersDetails(obj, TeamId) {
    //Table header
    let playersHeader = `<tr>
    <th>Player Name</th>
    <th>Email Address</th>
    <th class="text-center">More Info</th>
    <th>Action</th></tr>`;
    $("#playersHeader").append(playersHeader);
    // End of table header

    // Loop  thru the array of players
    for (let i = 0; i < obj.Members.length; i++)
    {
        // Table body for students
        let uri = "deleteplayer.html?TeamId=" + TeamId +"&membername=" + obj.Members[i].MemberName +"&email=" + obj.Members[i].Email+"&TeamName="+obj.TeamName+"&MemberId="+obj.Members[i].MemberId;
        uri = encodeURI(uri);
        // Create table 
        let players = `<tr>
        <td> ${obj.Members[i].MemberName}</td>
        <td> ${obj.Members[i].Email}</td>
        <td><a href="#"  class="fa fa-info-circle ml-5" id="moreinfo${i}" data-toggle="popover"></a>
        </td>
        <td> <a href='${uri}' role='button' class="btn btn-danger btn-sm">Delete</a></td>
        </tr>`;
        $("#playersTable").append(players);

    // Popover 
        let popoverContent = `<b>Age: </b>${obj.Members[i].Age}<br><b>Gender: </b>${obj.Members[i].Gender}<br><b>Phone Number: </b>${obj.Members[i].Phone}`

        $("#moreinfo"+i).popover({
            title:"Player Info",
            content: popoverContent,
            html: true,
            placement: 'right',
            trigger: 'hover',
        })
    }
      // Hide if there are not registered players.
      if (obj.Members.length == "") {
        $("#studentsHide").hide();
    }
}

