const Utils = require('../utils');

describe('Utils: utilities for the APIs', () => {
    it('Utils.getLatLongDistance: should be a function', () => {
        expect(typeof Utils.getLatLongDistance).toBe('function')
    })
    it('Utils.getLatLongDistance: should calculate distance between 2 lat-longs', () => {
        expect(Utils.getLatLongDistance(
            { lat: 12.971599, long: 77.594563 },  // Bangalore
            { lat: 19.075984, long: 72.877656 }  // MUMBAI
        )).toBe(845.32)
        expect(Utils.getLatLongDistance(
            { lat: 12.971599, long: 77.594563 },  // Bangalore
            { lat: 28.704059, long: 77.102490 }  // DELHI
        )).toBe(1750.11)
        expect(Utils.getLatLongDistance(
            { lat: 12.971599, long: 77.594563 },  // Bangalore
            { lat: 33.778175, long: 76.576171 }  // KASHMIR
        )).toBe(2315.88)
    })
})