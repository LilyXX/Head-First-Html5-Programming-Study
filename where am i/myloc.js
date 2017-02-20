window.onload = getMyLocation;
var watchId = null;

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(displayLocation,displayError);
}

function clearWatch(){
    if(watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function getMyLocation(){
    if (navigator.geolocation){
        // navigator.geolocation.getCurrentPosition(displayLocation,displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else{
        alert("Oops, no geolocation support");
    }
}

function addMarker(map,latlong,title,content){
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };

    var infoWindowOptions = {
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.infoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });
}

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
    
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.mapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv,mapOptions);

    var title = "Your location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map,googleLatAndLong,title,content);
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WS HQ";

    // showMap(position.coords);

    if(map == null){
        showMap(position.coords);
    }
}

function displayError(error){
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2){
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads= degreesToRadians(destCoords.longitude);

    var Radius = 6731; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads)　+ Math.cos(startLatRads) * Math.cos(destLatRads)　* Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians; 
}