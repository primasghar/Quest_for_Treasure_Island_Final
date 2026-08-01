import { allICAOCodes,airportData } from './apis.js'

// Creates the map
let map;
let markers = []
let trailPoints = []
let trailLine;

export const showMapOnLoad = (locations) => {
    map = L.map('map', {
        center: [60.3184, 24.9633],
        zoom: 4,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a circle, marker, and label for each location
    markers = locations.map((loc, i) => {
        L.circle(loc.coords, {radius: 500}).addTo(map);

        const marker = L.marker(loc.coords).addTo(map);

        marker.bindTooltip(`${i + 1}. ${loc.name}`, {
            permanent: true,
            direction: 'right',
            offset: [10, 0],
            className: 'stop-label'
        });

        marker.bindPopup(`<strong>Stop ${i + 1}</strong><br>${loc.name}`);

        return marker;
    });

    // Build the trail connecting all locations in order
    trailPoints = locations.map(loc => loc.coords);
    trailLine = L.polyline(trailPoints, {
        color: 'blue',
        weight: 3,
        dashArray: '10, 10'
    }).addTo(map);

    // map.fitBounds(trailLine.getBounds(), {padding: [30, 30]});
}
//Gets all the airports visited already to reload them on map, if player reloads the page.
export const mapVisitedAirportsOnLoad = async (level) => {
    const airportDataForMap = [];

    let allGameAirportICAO = await allICAOCodes();

    const allVisitedICAO = allGameAirportICAO.slice(0, level).map(pair => pair[1]);

    let allAirportsVisitedData = await airportData(allVisitedICAO)

    //Getting only necessary data for map, name and lat/lon
    for (const airport of allAirportsVisitedData.airports) {
        const airportName = airport.airportName;
        const lat = airport.lat;
        const lon = airport.lon;

        airportDataForMap.push({name: airportName, coords: [lat, lon]})
    }

    return airportDataForMap;
}

// Push a new location and update the map to show it
export const addLocation = (loc, locations) => {
    if (!map) {
        console.warn('Map not initialised — call showMapOnLoad first');
        return;
    }

    locations.push(loc);
    const i = locations.length - 1;

    // Circle + marker for the new location
    L.circle(loc.coords, {radius: 500}).addTo(map);

    const marker = L.marker(loc.coords).addTo(map);

    marker.bindTooltip(`${i + 1}. ${loc.name}`, {
        permanent: true,
        direction: 'right',
        offset: [10, 0],
        className: 'stop-label'
    });

    marker.bindPopup(`<strong>Stop ${i + 1}</strong><br>${loc.name}`);

    markers.push(marker);

    // Extend the trail to include the new point
    trailPoints.push(loc.coords);
    trailLine.setLatLngs(trailPoints);

    // Optionally re-fit the map to include the new point
    map.fitBounds(trailLine.getBounds(), {padding: [30, 30]});
}