import { allICAOCodes,airportData } from './apis.js'

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
