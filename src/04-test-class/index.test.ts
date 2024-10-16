// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    const withdrawAmount = 200;

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const toAccount = getBankAccount(0);

    expect(() => account.transfer(200, toAccount)).toThrow(Error);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(50, account)).toThrow(Error);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);

    expect(account.deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);

    expect(account.withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const toAccount = getBankAccount(0);

    expect(account.transfer(50, toAccount).getBalance()).toBe(50);
    expect(toAccount.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const result = await account.fetchBalance();

    if (result !== null) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(50);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
