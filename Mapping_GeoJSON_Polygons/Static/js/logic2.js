
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
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Light Street Map': streets,
    'Dark Street Map': dark
  };

  // Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 4
  });
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/ericksonvo/Mapping_Earthquakes/4e5b95771fb5324c037577df6f904c0dcc2a454d/majorAirports.json";

// Grabbing out GeoJSON data
d3.json(airportData).then((data)=>{
    console.log(data);
// create a GeoJSON layer with the retrived data
  L.geoJSON(data, {
  pointToLayer: function(feature, a) {
    console.log(feature);
    return L.marker(a)
    .bindPopup("<h2>" + "Airport Code:" + " " + feature.properties.faa + "</h2> <hr> <h3> "+ "Airport Name:" + " " + feature.properties.name + "</h3>" )}
  }).addTo(map);
}
)
// Then we add our 'graymap' tile layer to the map.

streets.addTo(map);