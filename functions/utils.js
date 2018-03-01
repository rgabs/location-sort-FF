const toRadians = (degrees) => degrees * (Math.PI / 180);

const getLatLongDistance = (fromLocation, toLocation) => {
    const R = 12742; // Radius of the earth in km * 2
    const fromLat = toRadians(fromLocation.lat);
    const fromLong = toRadians(fromLocation.long);
    const toLat = toRadians(toLocation.lat);
    const toLong = toRadians(toLocation.long);
    const dLat = (toLat - fromLat);
    const dLon = (toLong - fromLong);
    const delta = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((fromLat)) * Math.cos((toLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const distance = R * Math.atan2(Math.sqrt(delta), Math.sqrt(1 - delta)); // Distance in km
    return Math.round(distance * 100) / 100;
}

module.exports = { 
    getLatLongDistance
}