// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

console.log(data);


function chooseColor(borough) {
    if (borough == "Brooklyn") return "yellow";
    else if (borough == "Bronx") return "red";
    else if (borough == "Manhattan") return "orange";
    else if (borough == "Queens") return "green";
    else if (borough == "Staten Island") return "purple";
    else return "black";
  }

  
function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
    var Stadia_StamenToner = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": Stadia_StamenToner
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      31.7917, 7.0926
    ],
    zoom: 2,
    layers: [street, earthquakes]
  });

  marker.bindPopup("insert message here");
  Stylize markers based on earthquake severity


  // Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(population) {
    return Math.sqrt(population) * 50;
  }


L.marker([32.7767, -96.7979], {
    icon: customIcon
}).addTo(myMap);
  
  // Loop through the cities array, and create one marker for each earthquake occurrence.
  for (let i = 0; i < earthquakes.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",

      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(cities[i].population)
    }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

// Create legend and define properties
    var legend = L.control(
        {
            position: 'topleft'
        }
    );



// // Creating the map object
// var myMap = L.map("map", {
//     center: [31.7917, 7.0926],
//     zoom: 2
//   });
  
//   // Adding the tile layer
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);
  
//   // Store the API query variables.
//   var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

//   // Get the data with d3.
//   d3.json(url).then(function(response) {
  
//     // Create a new marker cluster group.
//     let markers = L.markerClusterGroup();
  
//     // Loop through the data.
//     for (let i = 0; i < response.length; i++) {
  
//       // Set the data location property to a variable.
//       let location = response[i].location;
  
//       // Check for the location property.
//       if (location) {
  
//         // Add a new marker to the cluster group, and bind a popup.
//         markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//           .bindPopup(response[i].descriptor));
//       }
  
//     }
  
//     // Add our marker cluster layer to the map.
//     myMap.addLayer(markers);
  
//   });
  

//   //marker.bindPopup("insert message here");
//   //Stylize markers based on earthquake severity


// //   // Define a markerSize() function that will give each city a different radius based on its population.
// // function markerSize(population) {
// //     return Math.sqrt(population) * 50;
// //   }
  
// //   // Loop through the cities array, and create one marker for each city object.
// //   for (let i = 0; i < cities.length; i++) {
// //     L.circle(cities[i].location, {
// //       fillOpacity: 0.75,
// //       color: "white",
// //       fillColor: "purple",
// //       // Setting our circle's radius to equal the output of our markerSize() function:
// //       // This will make our marker's size proportionate to its population.
// //       radius: markerSize(cities[i].population)
// //     }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
// //   }
  