function returnPrettyTime(date) {
    return date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}

function buildGoogleCalendar(data) {
    console.log(data);
    var calSummary = data.summary
    document.getElementById("calUserName").innerHTML = calSummary;
    if (data.items.length == 0) {
        let googleCalObj = document.getElementById("googleCalendar");
        googleCalObj.innerHTML += "<h3>No events today!</h3>"

    }
    data.items.forEach(event => {
        // Get Calendar dom element
        let googleCalObj = document.getElementById("googleCalendar");
        // Get start time and make it pretty
        let eStartTime = event.start.dateTime;
        eStartTime = new Date(eStartTime);
        eStartTime = returnPrettyTime(eStartTime);
        // Get end time and make it pretty
        let eEndTime = event.end.dateTime;
        eEndTime = new Date(eEndTime);
        eEndTime = returnPrettyTime(eEndTime);
        let htmlLink = event.htmlLink;
        let eventDescription = event.description;
        if (!eventDescription) {
            eventDescription = "";
        }
        googleCalObj.style.display = "block";
            googleCalObj.innerHTML += `<div class="googleCalendarBlock">
                                        <h3 class="gCalEventName">${event.summary}<h3>
                                        <p>
                                            <i>${eventDescription}</i>
                                        </p>
                                        <h4>${eStartTime} to ${eEndTime}<h4>
                                        <a href="${htmlLink}" >Open in Google Calendar</a>
                                        <hr>
                                      </div>`
    });

    
}