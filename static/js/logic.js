// Store our API endpoint as queryUrl. Focus is on magnitude 4.5 and larger earthquakes from the last 30 days.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, we log the data amd send the data.features object to the createFeatures function.
  console.log(data)
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function chooseColor(depth) {
    console.log(depth)
    if (depth > 90)
    return "Black";
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
        25.2744, 133.7751
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
    L.circleMarker(cities[i].location, {

      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(cities[i].mag)
    }).bindPopup(`<h1>${cities[i].mag}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }
}

 // Define a markerSize() function that will give each city a different radius based on its population.
  function markerSize(population) {
    scaledMag = population**2;
    console.log(`magnitude: ${population}, scaledMag: ${scaledMag}`);
    return scaledMag
  }

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h3>Depth:${feature.geometry.coordinates[2]}</h3><hr><h3>Magnitude:${(feature.properties.mag)}</h3><p>${new Date(feature.properties.time)}</p>`);
      }

      // Stylize markers based on earthquake severity
      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
      // Run the onEachFeature function once for each piece of data in the array.
      var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
          pointToLayer: function (feature, lat_long) {
            return new L.circleMarker(lat_long, {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: "White",
                opacity: .5,
                fillOpacity: .85,
                stroke: false,
                weight: .5
            });
        }
      });

     // Send our earthquakes layer to the createMap function/
      createMap(earthquakes);
    }

  // Create legend and define properties
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (earthquakes) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 30, 50, 100, 50, 70, 90],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<h2>DEPTH<br>Kilometers</h2>";
            div.innerHTML += '<i style="background: "Black"></i><span>GREATER THAN 90</span><br>';
            div.innerHTML += '<i style="background: "Red"></i><span>71 - 90</span><br>';
            div.innerHTML += '<i style="background: "Orange"></i><span>51 - 70</span><br>';
            div.innerHTML += '<i style="background: "Gold"></i><span>31 - 50</span><br>';
            div.innerHTML += '<i style="background: "Chartreuse"></i><span>11 - 30</span><br>';
            div.innerHTML += '<i style="background: "LimeGreen"></i><span>10 OR LESS</span><br>';
      }
      return div;
      };
      legend.addTo(earthquakes);
  