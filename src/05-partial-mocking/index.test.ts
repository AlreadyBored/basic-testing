// Uncomment the code below and write your tests
import type * as ModuleTypes from './index';

jest.mock('./index', () => {
  const actual = jest.requireActual<typeof ModuleTypes>('./index');
  return {
    __esModule: true,
    ...actual,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  let consoleSpy: jest.SpiedFunction<typeof console.log>;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  /* ---------------------------------------------------------------- */
  test('mockOne, mockTwo, mockThree should NOT log to console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleSpy).not.toHaveBeenCalled();
    expect(mockOne).toHaveBeenCalledTimes(1);
    expect(mockTwo).toHaveBeenCalledTimes(1);
    expect(mockThree).toHaveBeenCalledTimes(1);
  });

  /* ---------------------------------------------------------------- */
  test('unmockedFunction SHOULD log to console', () => {
    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
