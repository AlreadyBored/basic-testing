// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock<typeof import('./index')>('./index', () => ({
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: jest.fn(() => null),
  mockTwo: jest.fn(() => null),
  mockThree: jest.fn(() => null),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockedLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockedLog).not.toHaveBeenCalled();
    mockedLog.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const mockedLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(mockedLog).toHaveBeenCalled();
    mockedLog.mockRestore();
  });
});
