
// add console.log to check to see if out code is working.
console.log("working");

// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Streets': streets,
    'Satellite Streets': satelliteStreets
  };

  // Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [39.5, -98.51],
    zoom: 3
  });
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the earthquake GeoJSON UR
var earthQuakes7 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Create a style for the lines.
let myStyle = {
  color: "blue",  
  fillColor: "#ffffa1",
  weight: 1
}

// Grabbing our GeoJSON data.
d3.json(earthQuakes7).then((data)=>{
  console.log(data);
// create a GeoJSON layer with the retrived data
L.geoJSON(data
//   style: myStyle,
//   onEachFeature: (feature, a) => {

//   a.bindPopup("<hr>" + "<h2>" + "Neighborhood:" + " " + feature.properties.AREA_NAME + "</h2> <hr> <h3> " )}
).addTo(map);
}
)
// Then we add our 'graymap' tile layer to the map.

streets.addTo(map);