import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(123);

    expect(result).toEqual(123);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testErrorMsg = 'Test Error';

    try {
      throwError(testErrorMsg);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toEqual(testErrorMsg);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toEqual('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (err) {
      expect(err).toBeInstanceOf(MyAwesomeError);
      expect((err as MyAwesomeError).message).toEqual(
        'This is my awesome custom error!',
      );
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
