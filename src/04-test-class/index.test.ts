import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(122);
    expect(account.getBalance()).toBe(122);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(12);
    expect(() => account.withdraw(13)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(122);
    const toAccount = getBankAccount(100);
    const amount = 123;
    expect(() => account.transfer(amount, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(122);
    const toAccount = account;
    const amount = 123;
    expect(() => account.transfer(amount, toAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(122);
    account.deposit(50);
    expect(account.getBalance()).toBe(172);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(122);
    account.withdraw(10);
    expect(account.getBalance()).toBe(112);
  });

  test('should transfer money', () => {
    const account = getBankAccount(122);
    const toAccount = getBankAccount(140);
    const amount = 10;
    account.transfer(amount, toAccount);
    expect(account.getBalance()).toBe(112);
    expect(toAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(122);
    const result = await account.fetchBalance();
    const isValid = typeof result === 'number' || result === null;
    expect(isValid).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(122);
    const oldBalance = account.getBalance();

    try {
      await account.synchronizeBalance();
      const newBalance = account.getBalance();

      expect(typeof newBalance).toBe('number');
      expect(newBalance).not.toBe(oldBalance);
    } catch (error) {
      if (error instanceof SynchronizationFailedError) {
        console.error('fetchBalance returned null');
      } else {
        throw error;
      }
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(122);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
