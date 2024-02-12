// Uncomment the code below and write your tests
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

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn);
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenLastCalledWith('I am not mocked');
  });
});
