import { TIMEOUT_TEST } from 'utils';
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test(
    'mockOne, mockTwo, mockThree should not log into console',
    () => {
      const spy = jest.spyOn(console, 'log');

      mockOne();
      mockTwo();
      mockThree();
      expect(spy).not.toBeCalled();
    },
    TIMEOUT_TEST,
  );

  test(
    'unmockedFunction should log into console',
    () => {
      const spy = jest.spyOn(console, 'log');

      unmockedFunction();

      expect(spy).toBeCalled();
    },
    TIMEOUT_TEST,
  );
});
