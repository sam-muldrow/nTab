// Copyright 2022
// Source code owned by Salvatore Muldrow - Seacoast Software
// ===================================================================
// getting all required elements
const input = document.getElementById("searchInput");
const searchResultBox = document.getElementById("searchResultBox");

function mCallback(result) {
    console.log('result');
}

function reqListener (e) {
    parser = new DOMParser();
    let userData = e.currentTarget.userData
    xmlDoc = parser.parseFromString(this.responseText,"text/xml");
    xmlDoc = xmlDoc.getElementsByTagName("suggestion");
    var suggestionArray = [];
    for (i = 0; i < xmlDoc.length; i++) {
        const xmlNodeValue = xmlDoc[i].attributes[0].nodeValue; 
        if(xmlNodeValue != null) {
            suggestionArray.push(xmlNodeValue);
        }
        
    }
    let sortedResultArray = suggestionArray.filter((data)=>{
        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
    });
    let searchResultArrayString = '';
    console.log(sortedResultArray);
    sortedResultArray.map((data)=>{
        if (data != undefined) {
            searchResultArrayString += "<li> <a href='https://www.google.com/search?q=" + data + "' />" + data + "</li>";
        }
        
    });
    document.getElementById("searchResultBox").innerHTML = searchResultArrayString;
    if (userData = "") {
        document.getElementById("searchResultBox").innerHTML = "";
    }
    
}
  


// if user press any key and release
input.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    if(userData){
        var request = new XMLHttpRequest();
        request.open("GET", 'http://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q='+userData);
        request.addEventListener("load", reqListener)
        request.userData = userData;
        request.overrideMimeType('text/xml');
        request.send(null);
    }else{
        searchResultBox.innerHTML = ""; //hide autocomplete box
    }
}
