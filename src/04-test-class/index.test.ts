// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account1 = getBankAccount(100);
    expect(account1.getBalance()).toBe(100);

    const account2 = getBankAccount(0);
    expect(account2.getBalance()).toBe(0);

    const account3 = getBankAccount(-50);
    expect(account3.getBalance()).toBe(-50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(51)).toThrow(InsufficientFundsError);
    expect(account.getBalance()).toBe(50);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(51, account2)).toThrow(
      InsufficientFundsError,
    );
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    expect(account.getBalance()).toBe(100);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);

    account.deposit(0);
    expect(account.getBalance()).toBe(150);

    account.deposit(100).deposit(25);
    expect(account.getBalance()).toBe(275);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(200);
    account.withdraw(50);
    expect(account.getBalance()).toBe(150);

    account.withdraw(0);
    expect(account.getBalance()).toBe(150);

    account.withdraw(100).withdraw(25);
    expect(account.getBalance()).toBe(25);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(200);
    const account2 = getBankAccount(100);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(150);
    expect(account2.getBalance()).toBe(150);

    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(250);

    account2.transfer(25, account1).transfer(25, account1);
    expect(account1.getBalance()).toBe(100);
    expect(account2.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const result = await account.fetchBalance();

    if (result !== null) {
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(42);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
