// Create the map instance
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [7.8731, 80.7718],
    zoom: 12
});

let routeLayer; // Variable to store the route layer

function runDirection(start, end) {
    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end
        ]
    });

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            var marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            var marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

            return marker;
        }
    });

    // Remove the previous route layer if it exists
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }

    // Clear existing markers from the map
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Fetch locations from PHP script after route calculation
    fetch('locations.php?destination_name=' + end) // Pass the destination name to PHP script
        .then(response => response.json())
        .then(data => {
            // Process fetched data and display on the map
            data.forEach(location => {
                L.marker([location.latitude, location.longitude])
                    .addTo(map)
                    .bindPopup(`<b>${location.name}</b><br>${location.description}`);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Create and display the new route layer
    routeLayer = new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    });

    map.addLayer(routeLayer);
}

function submitForm(event) {
    event.preventDefault();

    // Getting form data
    let start = document.getElementById("start").value;
    let end = document.getElementById("destination").value;

    // Run directions function
    runDirection(start, end);

    // Reset form
    document.getElementById("form").reset();
}

// Assign the form to form variable
const form = document.getElementById('form');

// Call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);
