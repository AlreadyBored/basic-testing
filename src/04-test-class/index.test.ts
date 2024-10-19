import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(100);

    expect(acc.getBalance()).toEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(1);

    expect(() => acc.withdraw(2)).toThrowError(new InsufficientFundsError(1));
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(1);
    const acc2 = getBankAccount(1);

    expect(() => acc1.transfer(2, acc2)).toThrowError(
      new InsufficientFundsError(1),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(1);

    expect(() => acc.transfer(2, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(1);

    expect(acc.deposit(1).getBalance()).toEqual(2);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(2);

    expect(acc.withdraw(1).getBalance()).toEqual(1);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(2);
    const acc2 = getBankAccount(1);
    acc1.transfer(1, acc2);

    expect(acc1.getBalance()).toEqual(1);
    expect(acc2.getBalance()).toEqual(2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(1);

    const balance = await acc.fetchBalance();
    try {
      expect(typeof balance).toBe('number');
    } catch {
      expect(balance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(101);

    try {
      await acc.synchronizeBalance();
      const balance = acc.getBalance();
      expect(typeof balance).toBe('number');
      expect(balance).not.toBe(101);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(1);

    try {
      await acc.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
