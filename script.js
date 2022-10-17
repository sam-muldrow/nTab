// Copyright 2022
// Source code owned by Salvatore Muldrow - Seacoast Software

// ================================= Global and Other Vars ==================================================
// Wack giant JSON file to store background
const backgroundOptions = {
    "backgroundOptions" : [{
            "regularBackground" : {
                "type": "color",
                "background-color" : "#323437",
                "text-color" : "#FFFFFF"
            },
            "Artem" : {
                "type": "image",
                "src" : "artem-labunsky-Ehg9b_GzOXw-unsplash.jpg"
            } ,       
            "Clayton" : {
                "type": "image",
                "src" : "clayton-uMlJgAViDJk-unsplash.jpg"
            },
            "Neha" : {
                "type": "image",
                "src" : "neha-maheen-mahfin-T_2NQhHQqLM-unsplash.jpg"
            },
            "Reinaldo" : {
                "type": "image",
                "src": "reinaldo-photography-EzbCrXAzvo4-unsplash.jpg"
            },
            "Rhamley" : {
                "type": "image",
                "src": "rhamely-yrWL7KrigPo-unsplash.jpg"
            },
            "Mercedes-Mehling" : { 
                "type": "image",
                "src": "mercedes-mehling-7I9aCavB8RI-unsplash.jpg"
            },
            "Zayn-Shah": {
                "type": "image",
                "src": "zayn-shah-KeeX0u6xasU-unsplash.jpg"
            },
            "Artem-Sapegin": {
                "type": "image",
                "src": "artem-sapegin-qe4cJxjIo8Q-unsplash.jpg",
            },
            "Guillermo-Ferla": {
                "type": "image",
                "src": "guillermo-ferla-Oze6U2m1oYU-unsplash.jpg"
            },
            "Launch - SpaceX Collection": {
                "type": "image",
                "src": "spacex-6SbFGnQTE8s-unsplash.jpg"
            },
            "Sky - SpaceX Collection": {
                "type": "image",
                "src": "spacex--p-KCm6xB9I-unsplash.jpg"
            },  
            "Outside - NASA Collection": {
                "type": "image",
                "src": "nasa-gYwfpVI2JzM-unsplash.jpg"
            },
            "Wave - NASA Collection": {
                "type":"image",
                "src": "nasa-WKT3TE5AQu0-unsplash.jpg"
            },
            "Center - NASA Collection": {
                "type":"image",
                "src": "nasa-YOId6dA4c0I-unsplash.jpg"
            }
}]
}

// A global string in case we can cache the background image name
let backgroundImageGlobal = '';

// ================================= Logic Functions ==================================================
// Clock init runs every second
function clockInit (){
    // Clock init
    var dateWithouthSecond = new Date();
    dateWithouthSecond = dateWithouthSecond.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById("timeDisplay").innerHTML = dateWithouthSecond;
    setTimeout(clockInit, 1000); 
}
// Runs when the loads in
function googleInit() {
    // Logic for grabbing only todays info 
    // Build date string for beginning of the day
    var d = new Date();
    d.setHours(0,0,0,0);
    var dateAtBeginningOfDay = d.toISOString();
    // Build date string for end of the day
    const ed = new Date();
    ed.setHours(23, 59, 59, 999);
    var dateAtEndOfDay = ed.toISOString();
    // Make oauth2 request for current day's events
    chrome.identity.getAuthToken({interactive: true}, function(token) {
        let init = {
            method: 'GET',
            async: true,
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            'contentType': 'json'
          };
        fetch(
            'https://content.googleapis.com/calendar/v3/calendars/primary/events?timeMin='+dateAtBeginningOfDay+'&timeMax='+dateAtEndOfDay+'&singleEvents=true&orderBy=startTime',
            init)
            .then((response) => response.json())
            .then(function(data) {
                // Get rid of sign in button and build calendar with the data
                document.getElementById("googleOauthButton").style.display = 'none';
                buildGoogleCalendar(data);
            });
      });
}

function triggerGoogleSearch() {
    let searchValue = $('#searchInput').val();
    window.location.replace(`https://www.google.com/search?q=${searchValue}`);
}

// Set the background given the name
function setBackground(backgroundName) {
    // Apply image or color based on type
    if (backgroundOptions["backgroundOptions"][0][backgroundName]['type'] == "image") {
        // Image
        document.getElementById("overallBody").style.backgroundImage = 'url("./images/' +backgroundOptions["backgroundOptions"][0][backgroundName]["src"] +'")';
        document.getElementById("backgroundSelect").value = backgroundName
    } else {
        // Color
        document.getElementById("overallBody").style.backgroundColor = backgroundOptions["backgroundOptions"][0][backgroundName]["background-color"];
        document.getElementById("overallBody").style.backgroundImage = '';
        document.getElementById("backgroundSelect").value = backgroundName
    }
}

// Does what it is called
function getAndSetBackgroundImage() {
    chrome.storage.sync.get(['background-image'], function(result) {
        if(result["background-image"]) {
            result = result["background-image"];
            if(result) {
                setBackground(result);
                backgroundImageGlobal = result;
                document.getElementById("backgroundSelect").value = result;
            }  
        } else {
            saveBackground("regularBackground");
            document.getElementById("backgroundSelect").value = result
            backgroundImageGlobal = result;
        }
    });
}

// Save background to local storage
function saveBackground(backgroundName) {
    chrome.storage.sync.set({'background-image': backgroundName});
}
// ============================ Logic after DOM content loaded ===========================================================

// DOM new loaded 
document.addEventListener('DOMContentLoaded', (event) => {
    // Start the clock
    clockInit();
    // Init google 
    googleInit();
    // See if we have this cached already
    if(backgroundImageGlobal != '') {
        setBackground(backgroundImageGlobal);
    } else {
        getAndSetBackgroundImage();
    }
    
    // ======================== JQuery Event Handlers ==========================================
    $('#searchSubmitButton').click(function() {
        triggerGoogleSearch();
    });

    $('#searchInput').on('keyup', function(e) {
        if (e.keyCode === 13) {
            triggerGoogleSearch();
        }
    });

    $('#footerSettingsButton').click(function() {
        let modal = document.getElementById("settingsModal");
        modal.style.display = "block";
    });

    $('#footerSettingsButton').click(function() {
        let modal = document.getElementById("settingsModal");
        modal.style.display = "block";
    });


    $('#integrationStart').click(function() {
        let modal = document.getElementById("settingsModal");
        modal.style.display = "block";
    });

    $('#settingsModalCloseButton').click(function() {
        let modal = document.getElementById("settingsModal");
        modal.style.display = "none";
    });

    $('#authorize_button').click(function() {
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            console.log(token);
          });
    });

    // ============================= Modal Controls ==================================================
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        let modal = document.getElementById("settingsModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // ============================= Background selecction ==================================================
    document.getElementById("backgroundSelect").addEventListener('change', (event) => {
        const result = document.querySelector('.result');
        saveBackground(event.target.value);
        setBackground(event.target.value);
    });

});