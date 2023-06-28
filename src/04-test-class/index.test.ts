import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);
    expect(() => account1.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawalAmount = 50;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 50;
    const transferAmount = 30;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(2);
    const account = getBankAccount(0);
    account.fetchBalance = fetchBalance;
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(2);
    const account = getBankAccount(0);
    account.fetchBalance = fetchBalance;
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(null);
    const account = getBankAccount(0);
    account.fetchBalance = fetchBalance;
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
