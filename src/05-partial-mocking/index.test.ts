import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();

jest.mock('./index', () => ({
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
  unmockedFunction: jest.requireActual('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(console.log).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
