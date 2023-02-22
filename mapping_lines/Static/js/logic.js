
// add console.log to check to see if out code is working.
console.log("working");


// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.6214, -122.3790], 5);
// Coordinates for each point to be used in the line.
let line = [
  [33.9416, -118.4085],
  [39.8564, -104.6738],
  [29.9839, -90.0715],
  [41.9803, -87.9090],
  [40.7769, -73.8740]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "blue",
  weight: '4',
  dashArray: '20',
  opacity: '0.5'

}).addTo(map);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.circleMarker([34.0522, -118.2437],{
//     radius: 300,
//     color: "black",
//     fillColor: '#ffffa1'
// }).addTo(map);
// Add the map tile layer method. This is used to load and display a tile layer on the map.

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.

streets.addTo(map);

// An array containing each city's location, state, and population.
// Get data from cities.js
let cityData = cities;

//Loop through the cities array

cities.forEach((city) => {
    console.log(city)
    L.circleMarker(city.location, {
      radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
  .addTo(map);
})

