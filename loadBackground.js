// Copyright 2022
// Source code owned by Salvatore Muldrow - Seacoast Software
// ===================================================================
// Quick hack script to try and grab background name before page load
chrome.storage.sync.get(['background-image'], function(result) {
    if(result["background-image"]) {
        result = result["background-image"];
        if(result) {
            backgroundImageGlobal = result;
            setBackground(backgroundImageGlobal);
        }  
    } else {
        saveBackground("regularBackground");
        backgroundImageGlobal = result;
        setBackground(backgroundImageGlobal);
    }
});