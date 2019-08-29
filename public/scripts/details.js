"use strict";
$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");


    // Get information with the Team Id of the selected team.
    $.getJSON("api/teams/" + TeamId, function (data) {
        let obj;
        obj = data;
        teamDetails(obj)
        playersDetails(obj,TeamId)
    });

    // Necesito ver si esto esta bien
    $("#registerButton").attr("href", "register.html?TeamId=" + TeamId);

    $("#registerButton").on("click", function () {
        document.location.href = "register.html?TeamId=" + TeamId;
    });


}); // end of ready fuction
//Table Body
function teamDetails(obj) {
    let details =
        "<tr><td class='font-weight-bold'> Team Id:</td><td>" +
        obj.TeamId + "</td></tr>" + // First Row
        "<tr><td class='font-weight-bold'> Team Name: </td><td>" +
        obj.TeamName + "</td></tr>" + // Second Row
        "<tr><td class='font-weight-bold'> League: </td><td>" +
        obj.League + "</td></tr>" + // Third Row
        "<tr><td class='font-weight-bold'> Manager Name: </td><td>" +
        obj.ManagerName + "</td></tr>" + // Fourth Row
        "<tr><td class='font-weight-bold'> Manager Phone Number:</td><td>" +
        obj.ManagerPhone + "</td></tr>" + // Fifth Row
        "<tr><td class='font-weight-bold'> Manager Email:</td><td>" +
        obj.ManagerEmail + "</td></tr>" + // Sixth Row
        "<tr><td class='font-weight-bold'> Max Players:</td><td>" +
        obj.MaxTeamMembers + "</td></tr>" + // Seventh Row
        "<tr><td class='font-weight-bold'> Team Gender:</td><td>" +
        obj.TeamGender + "</td></tr>"; // Eight Row

    $("#detailsTable").append(details);

}

// Table for Players
function playersDetails(obj, TeamId) {
    //Table header
    let playersHeader = 
    `<tr>
    <th>Player Name</th>
    <th>Email Address</th>
    <th>Action</th></tr>`;
    $("#playersHeader").append(playersHeader);
    // End of table header

    // Loop  thru the array of students
    for (let i = 0; i < obj.Members.length; i++) {
        // Table body for students
        let uri = "deletestudent.html?TeamId=" + TeamId + "&studentName=" + obj.Members[i].MemberName + "&email=" + obj.Members[i].Email;
        uri = encodeURI(uri);
        let players = `<tr>
        <td> ${obj.Members[i].MemberName}</td>
        <td> ${obj.Members[i].Email }</td>
        <td> $<a href=" + uri + ">Unregister<a>" + "</td>
        </tr>`;
        $("#playersTable").append(players);
    }

       // Hide if there are not registered players
       if (obj.Members.length == "") {
        $("#studentsHide").hide();
    }
}




