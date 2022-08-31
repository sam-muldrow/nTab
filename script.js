document.addEventListener('DOMContentLoaded', (event) => {

    function triggerGoogleSearch() {
        let searchValue = $('#searchInput').val();
        window.location.replace(`https://www.google.com/search?q=${searchValue}`);
    }
    
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

    $('#settingsModalCloseButton').click(function() {
        let modal = document.getElementById("settingsModal");
        modal.style.display = "none";
    });



    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        let modal = document.getElementById("settingsModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});