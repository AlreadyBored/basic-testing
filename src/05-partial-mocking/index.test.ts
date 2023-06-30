// Uncomment the code below and write your tests
import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => ({
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
  unmockedFunction:
    jest.requireActual<typeof import('./index')>('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  let consoleLogSpy: jest.Mock;

  beforeAll(() => {
    consoleLogSpy = jest.fn();
    console.log = consoleLogSpy;
  });

  beforeEach(() => {
    consoleLogSpy.mockClear();
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    expect(mockOne).toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalledWith('foo');
    mockTwo();
    expect(mockTwo).toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalledWith('bar');
    mockThree();
    expect(mockThree).toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalledWith('baz');
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
