"use strict";

function generate_results() {
    // Extracting the data from the form
    let params = (new URL(document.location)).searchParams;
    if (params.has("artist")){
        let artist = params.get("artist");
        console.log(artistName);
        // Filling-in the placeholder element (finished later - see step 3)
        let placeholder = document.getElementById('placeholder');
        
        // Exercise # 2 - Beginning
        let queryURL = `http://musicbrainz.org/ws/2/artist/?query=${artist}`;
        console.log(queryURL);
        httpGet(queryURL, getMBID);

        // 1. Making the query (https://www.w3schools.com/js/js_ajax_http.asp - last two tables)
        let xmlHttp = new XMLHttpRequest(); // Create an XMLHttpRequest object
        xmlHttp.open("GET", queryURL); // Set the request method and URL
        xmlHttp.send(); // Initiates (sends) the request
        // Defines a function to be called when the readyState property changes
        xmlHttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                // readyState: holds the status of the XMLHttpRequest (0: request not initialized, 1: server connection established, 2: request received, 3: processing request, 4: request finished and response is ready)
                // status: returns the status-number of a request (200: "OK", 403: "Forbidden", 404: "Not Found")
                let retrievedData = this.responseXML; // Returns the response as document (XML data)
                console.log(retrievedData);
                
            }

            function getMBID(xhttp) {
                let retrievedData = xhttp.responseXML;
                console.log(retrievedData);
                let artistData = retrievedData.getElementsByTagName('artist')[0];
                console.log(artistData);
                let artistName = artistData.getElementsByTagName('name')[0].innerHTML;
                console.log(artistName);
                let artistMBID = artistData.id;
                console.log(artistMBID);
                let mBaseURL = "https://musicbrainz.org/ws/2/release-group?artist="; 
                let queryURL = mBaseURL + artistMBID;
                console.log(queryURL);
                httpGet(queryURL,getAlbums);
                getAlbums(artistMBID)


             function getAlbums(xhttp) {
                 let retrievedData = xhttp.responseXML;
                console.log(retrievedData);
                let albums=retrievedData.getElementsByTagName('release-group');
                    let placeholder = document.getElementById('placeholder');
                    let table = "<table><tr><th>Title</th><th>Date</th></tr>";
                    for (let row = 0; row < albums.length; row++){
                    let data = albums[row];
                    let AlbumNames = data.getElementsByTagName("title")[0].innerHTML;
                    console.log(AlbumNames);
                    let AlbumDates = data.getElementsByTagName("first-release-date")[0].innerHTML;
                    console.log(AlbumDates);
                    table += "<tr><td>" + AlbumNames + "</td>" + "<td>" + AlbumDates + "</td><tr>"
                    }
                    table += "</table>" 
                    placeholder.innerHTML = table;
                    }
            }
        };
    }
}

window.onload = generate_results();