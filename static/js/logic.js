// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, we log the data amd send the data.features object to the createFeatures function.
  console.log(data)
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function markerSize(mag) {
    return mag * 25000;
  }

  function chooseColor(depth) {
    if (depth > 90)
    return "FireBrick";
    else if (depth >70)
    return "Red";
    else if (depth > 50)
    return "Orange";
    else if (depth > 30)
    return "Gold";
    else if (depth > 10)
    return "Chartreuse";
    else 
    return "LimeGreen"    
    }

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
        40.9006, 174.8860
        ],
        zoom: 3,
        layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
  
  // Loop through the cities array, and create one marker for each earthquake occurrence.
  for (var i = 0; i < earthquakes.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
    })};

      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(feature.properties.mag)}
      bindPopup("<h3>${feature.properties.place}</h3><hr><h3>Depth:${feature.geometry.coordinates[2]}</h3><hr><p>Magnitude:${(feature.properties.mag)}</p>");
      };
      // pointToLayer: function (feature, lat_long) {
      // return new L.circle(lat_long,)
      // {radius: markerSize(feature.properties.mag),
      // fillColor: markerColor(feature.properties.mag),
      // fillOpacity: 1,
      // stroke: false
//   }
// };



// Create legend and define properties
      var legend = L.control({position: 'bottomright'});

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
      }
      
      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
      // Run the onEachFeature function once for each piece of data in the array.
      var earthquakes = L.geoJSON(earthquakeData), {
        pointToLayer: function (feature, lat_long) {
          return new L.circle(lat_long, {
              radius: (feature.properties.mag)*25000,
              fillColor: chooseColor(feature.properties.place[2]),
              color: "White",
              opacity: .5,
              fillOpacity: .75,
              stroke: true,
              weight: .5
          })
      },
        onEachFeature: onEachFeature
      });
    
      // Send our earthquakes layer to the createMap function/
      createMap(earthquakes);
    
  
