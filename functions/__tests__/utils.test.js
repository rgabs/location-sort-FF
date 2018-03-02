const Utils = require('../utils');

describe('Utils: utilities for the API', () => {
    it('Utils.getLatLongDistance: should be a function', () => {
        expect(typeof Utils.getLatLongDistance).toBe('function')
    })
    it('Utils.getLatLongDistance: handle edge cases', () => {
        expect(Utils.getLatLongDistance(null, null)).toMatchObject(new Error('Invalid Location'))
        expect(Utils.getLatLongDistance(undefined)).toMatchObject(new Error('Invalid Location'))
        expect(Utils.getLatLongDistance([], [])).toMatchObject(new Error('Invalid Location'))
        expect(Utils.getLatLongDistance({}, {})).toMatchObject(new Error('Invalid Location'))
    })
    it('Utils.getLatLongDistance: should calculate distance between 2 lat-longs', () => {
        expect(Utils.getLatLongDistance(
            { latitude: 12.971599, longitude: 77.594563 },  // Bangalore
            { latitude: 19.075984, longitude: 72.877656 }  // MUMBAI
        )).toBe(845.32)
        expect(Utils.getLatLongDistance(
            { latitude: 12.971599, longitude: 77.594563 },  // Bangalore
            { latitude: 28.704059, longitude: 77.102490 }  // DELHI
        )).toBe(1750.11)
        expect(Utils.getLatLongDistance(
            { latitude: 12.971599, longitude: 77.594563 },  // Bangalore
            { latitude: 33.778175, longitude: 76.576171 }  // KASHMIR
        )).toBe(2315.88)
    })
    it('Utils.getAllCustomers: should be a function', () => {
        expect(typeof Utils.getAllCustomers).toBe('function')
    })
    it('Utils.getAllCustomers: should return an array', async () => {
        const customers = await Utils.getAllCustomers();
        expect(Array.isArray(customers)).toBeTruthy();
    })
    it('Utils.getAllCustomers: should return all the customers', async () => {
        const customers = await Utils.getAllCustomers();
        expect(customers.length).toBe(32);
        customers.forEach((consumer) => {
            expect(consumer).toHaveProperty('latitude')
            expect(consumer).toHaveProperty('longitude')
            expect(consumer).toHaveProperty('name')
            expect(consumer).toHaveProperty('user_id')
        })
    })
    it('Utils.filterByDistance: should return sorted location based on passed lat long', () => {
        const customers = [{ latitude: 52.986375, longitude: -6.043701 },
            { latitude: 51.92893, longitude: -10.27699 },
            { latitude: 53.1229599, longitude: -6.2705202 }];

        const expected = [{ latitude: 52.986375, longitude: -6.043701, distance: 41.77 },
            { latitude: 53.1229599, longitude: -6.2705202, distance: 24.09 }];

        const officeLocation = { latitude: 53.339428, longitude: -6.257664 };
        expect(Utils.filterByDistance(customers, officeLocation)).toEqual(expected);
    })
})