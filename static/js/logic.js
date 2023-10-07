// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, we log the data amd send the data.features object to the createFeatures function.
  console.log(data)
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function chooseColor(mag) {
    if (mag <=4.5) {
        return "#f88b83";
    } else if (mag <= 5) {
        return "#eb3c3c";
    } else if (mag <= 5.5) {
        return "#FFFF00";
    } else if (mag <= 6) {
        return "#cc0000";
    } else if (mag <= 6.5) {
        return "#FFA500";
    } else if (mag < 7) {
        return "#8505ff";
    } else {
        return "#000000";
    };
  }

  // function chooseColor(magnitude) {
  //     if (magnitude == 4.5<=5.4) return "yellow";
  //     else if (magnitude == 5.5<=6.4) return "orange";
  //     else if (magnitude == 6.5<=7.4) return "red";
  //     else return "black";
  //   }

  function createMap(earthquakes) {

  // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

    var Stadia_StamenToner = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    });

  // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo,
        "Map Styling": Stadia_StamenToner
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

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);



  // Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(population) {
    return Math.sqrt(population) * 50;
  }


L.marker([32.7767, -96.7979], {
    icon: customIcon
}).addTo(myMap);
  
  // Loop through the cities array, and create one marker for each earthquake occurrence.
  for (var i = 0; i < earthquakes.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",

      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(cities[i].population)
    }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }
}

// Create legend and define properties
    var legend = L.control(
        {
            position: 'topleft'
        }
    );

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
      }
      // marker.bindPopup("insert message here");
      // Stylize markers based on earthquake severity
      
      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
      // Run the onEachFeature function once for each piece of data in the array.
      var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });
    
      // Send our earthquakes layer to the createMap function/
      createMap(earthquakes);
    }
    
  

  
   // Create a new marker cluster group.
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


