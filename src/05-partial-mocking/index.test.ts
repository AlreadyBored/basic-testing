import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

let spy: jest.SpyInstance;

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    spy.mockRestore();
  });

  beforeEach(() => {
    spy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    spy.mockReset();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(spy).toHaveBeenCalledWith('I am not mocked');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
