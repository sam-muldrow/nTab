// Copyright 2022
// Source code owned by Salvatore Muldrow - Seacoast Software

// ================================= Global and Other Vars ==================================================
// Wack giant JSON file to store background
const backgroundOptions = {
    "backgroundOptions" : [
        {
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
            }                      
        }

    ]
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
// Runs when 
function googleInit() {
    var d = new Date();
    d.setHours(0,0,0,0);
    var dateAtBeginningOfDay = d.toISOString();
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
            'https://content.googleapis.com/calendar/v3/calendars/primary?key=AIzaSyA9NyRrF78JCD4ZA9yCCtj74tG_aXrPfts?timeMin='+dateAtBeginningOfDay,
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(data)
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

// ============================== JIRA Cred Functions =========================================================

// Fills creds into storage modal
function fillInCreds(username, url, password) {
    document.getElementById("jiraCredUsername").value = username;
    document.getElementById("jiraCredPassword").value = password;
    document.getElementById("jiraCredURL").value = url;
}

// Resets UI in modal and in local DB
function resetCreds() {
    var jiraCredObject = {
        "jiraCredUsername": '',
        "jiraCredPassword": '',
        "jiraCredURL": ''
    }
    fillInCreds('','','');
    chrome.storage.sync.set({'jira-creds': jiraCredObject});        
}

// Save creds to DB based on UI inputs
function saveCreds() {
    var jiraCredUsername = document.getElementById("jiraCredUsername").value;
    var jiraCredPassword = document.getElementById("jiraCredPassword").value;
    var jiraCredURL = document.getElementById("jiraCredURL").value;
    var jiraCredObject = {
        "jiraCredUsername": jiraCredUsername,
        "jiraCredPassword": jiraCredPassword,
        "jiraCredURL": jiraCredURL
    }

    chrome.storage.sync.set({'jira-creds': jiraCredObject});
}

// Get Jira Creds
function onInit() {
    chrome.storage.sync.get(['jira-creds'], function(result) {
        if(result["jira-creds"]) {
            result = result["jira-creds"];
            fillInCreds(result["jiraCredUsername"], result["jiraCredURL"], result["jiraCredPassword"]);
        }
    });   
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
    document.getElementById("saveCredsButton").addEventListener("click", saveCreds);  
    document.getElementById("resetCredsButton").addEventListener("click", resetCreds);  

    
    // ============================= Background selecction ==================================================
    document.getElementById("backgroundSelect").addEventListener('change', (event) => {
        const result = document.querySelector('.result');
        saveBackground(event.target.value);
        setBackground(event.target.value);
    });
    onInit();
});