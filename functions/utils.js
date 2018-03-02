const toRadians = (degrees) => degrees * (Math.PI / 180);

const isValidLocation = (loc) => typeof loc === 'object' && loc !== null && loc.latitude && loc.longitude

const getLatLongDistance = (fromLocation, toLocation) => {
    if (!isValidLocation(fromLocation) || !isValidLocation(toLocation)) {
      return new Error('Invalid Location')
    }
    const R = 12742; // Radius of the earth in km * 2
    const fromLat = toRadians(fromLocation.latitude);
    const fromLong = toRadians(fromLocation.longitude);
    const toLat = toRadians(toLocation.latitude);
    const toLong = toRadians(toLocation.longitude);
    const dLat = (toLat - fromLat);
    const dLon = (toLong - fromLong);
    const delta = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((fromLat)) * Math.cos((toLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const distance = R * Math.atan2(Math.sqrt(delta), Math.sqrt(1 - delta)); // Distance in km
    return Math.round(distance * 100) / 100; // Rounding upto 2 decimals
}

const getAllCustomers = () => {
    const customers = require('./customers.json');
    return Promise.resolve(customers);
}

const filterByDistance = (customers, officeLocation) => {
    return customers
        .map((customer) => Object.assign({}, customer, { 
            distance: getLatLongDistance(officeLocation, customer)
        }))
        .filter(customer => customer.distance <= 100);
}

module.exports = { 
    getLatLongDistance,
    getAllCustomers,
    filterByDistance
}