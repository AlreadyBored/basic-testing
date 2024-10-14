// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  const dummy = () => void 0;

  return {
    ...originalModule,
    mockOne: dummy,
    mockTwo: dummy,
    mockThree: dummy,
  };
});

describe('partial mocking', () => {
  let spyLog: jest.SpyInstance;

  beforeEach(() => {
    spyLog = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    mockOne();
    expect(spyLog).not.toBeCalled();
    mockTwo();
    expect(spyLog).not.toBeCalled();
    mockThree();
    expect(spyLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    unmockedFunction();
    expect(spyLog).toBeCalledTimes(1);
  });
});
