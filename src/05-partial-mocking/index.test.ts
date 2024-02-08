// Uncomment the code below and write your tests
import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  const mockedEmptyFn = () => {
    return;
  };
  return {
    ...originalModule,
    mockOne: mockedEmptyFn,
    mockTwo: mockedEmptyFn,
    mockThree: mockedEmptyFn,
  };
});

describe('partial mocking', () => {
  let spiedConsoleLog: jest.SpyInstance;
  beforeEach(() => {
    spiedConsoleLog = jest.spyOn(console, 'log');
  });
  afterAll(() => {
    jest.unmock('./index');
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(spiedConsoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(spiedConsoleLog).toHaveBeenCalledTimes(1);
  });
});
