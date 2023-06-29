import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'noconsole'),
    mockTwo: jest.fn(() => 'noconsole'),
    mockThree: jest.fn(() => 'noconsole'),
  };
});

console.log = jest.fn();

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
