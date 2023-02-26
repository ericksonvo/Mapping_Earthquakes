
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
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(),
      stroke: true,
      weight: 0.5
    };
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  };

// Grabbing our GeoJSON data.
d3.json(earthQuakes7).then((data)=>{
  console.log(data);
// create a GeoJSON layer with the retrived data
L.geoJSON(data, {
  pointToLayer: ((feature,latlng) => {
    console.log(data);
    return L.circleMarker(latlng);
  }
  // set the style for the circleMarker.
  
  ),
  style: styleInfo
//   onEachFeature: (feature, a) => {

//   a.bindPopup("<hr>" + "<h2>" + "Neighborhood:" + " " + feature.properties.AREA_NAME + "</h2> <hr> <h3> " )}
}).addTo(map);
})
// Then we add our 'graymap' tile layer to the map.

streets.addTo(map);