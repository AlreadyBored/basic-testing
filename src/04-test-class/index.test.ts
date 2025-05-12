import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const account = getBankAccount(100);
  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(102)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(102, getBankAccount(1))).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(102, account)).toThrowError();
  });

  test('should deposit money', () => {
    account.deposit(10);
    expect(account.getBalance()).toBe(110);
  });

  test('should withdraw money', () => {
    account.withdraw(10);
    expect(account.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const account2 = getBankAccount(10);
    account.transfer(10, account2);
    expect(account2.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    if (balance !== null) expect(typeof balance).toBe('number');
    else {
      expect(balance).toBeNull;
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const numberReturn = 30;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(numberReturn);
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(balance).toBe(numberReturn);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
