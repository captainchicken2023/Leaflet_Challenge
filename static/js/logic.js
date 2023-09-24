// Creating the map object
let myMap = L.map("map", {
    center: [31.7917, 7.0926],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Store the API query variables.
  let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

  // Get the data with d3.
  d3.json(url).then(function(response) {
  
    // Create a new marker cluster group.
    let markers = L.markerClusterGroup();
  
    // Loop through the data.
    for (let i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable.
      let location = response[i].location;
  
      // Check for the location property.
      if (location) {
  
        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
          .bindPopup(response[i].descriptor));
      }
  
    }
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);
  
  });
  

  //marker.bindPopup("insert message here");
  //Stylize markers based on earthquake severity


//   // Define a markerSize() function that will give each city a different radius based on its population.
// function markerSize(population) {
//     return Math.sqrt(population) * 50;
//   }
  
//   // Loop through the cities array, and create one marker for each city object.
//   for (let i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "purple",
//       // Setting our circle's radius to equal the output of our markerSize() function:
//       // This will make our marker's size proportionate to its population.
//       radius: markerSize(cities[i].population)
//     }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
//   }
  