const functions = require('firebase-functions');
const Utils = require('../utils');
const {customers} = require('../index');

jest.mock('firebase-functions', () => {
  const responseHandler = jest.fn();
  return {
    https: { onRequest: handler => handler(null, { send: responseHandler}),},
    responseHandler
  }
})

jest.mock('../utils', () => ({
  getAllCustomers: jest.fn(() => Promise.resolve(['allLocations'])),
  filterByDistance: jest.fn(() => ['filteredLocations'])
}))

describe('customers handler: should get, sort and respond', () => {
  it('should call getAllCustomers, filterByDistance and then respond ', () => {
    const officeLocation = { latitude: 53.339428, longitude: -6.257664 };
    expect(Utils.getAllCustomers).toHaveBeenLastCalledWith();
    expect(Utils.filterByDistance).toHaveBeenLastCalledWith(['allLocations'], officeLocation);
    expect(functions.responseHandler).toHaveBeenLastCalledWith(['filteredLocations']);
  })
})