// Uncomment the code below and write your tests
import { getBankAccount } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(2020);
    expect(account.getBalance()).toBe(2020); 
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(2020);
    expect(() => account.withdraw(3000)).toThrow();
    expect(() => account.withdraw(3000)).toThrow(`Insufficient funds: cannot withdraw more than 2020`);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(2020);
    const transferMethod = account.transfer(3000, account);
    expect(transferMethod).toThrow();
    expect(transferMethod).toThrow('Transfer failed');
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(2020);
    const transferMethod = account.transfer(2020, account);
    expect(transferMethod).toThrow();
    expect(transferMethod).toThrow('Insufficient funds: cannot withdraw more than 2020');
  });

  test('should deposit money', () => {
    const account = getBankAccount(2020);
    const depositMethod = account.deposit(5);
    expect(depositMethod).toEqual({"_balance": 2025});
  });

  test('should withdraw money', () => {
    const account = getBankAccount(2020);
    expect(() => account.withdraw(20)).toEqual(2000);
  });

  test('should transfer money', () => {
    const accountOne = getBankAccount(2020);
    const accountTwo = getBankAccount(2000);
    expect(() => accountOne.transfer(20, accountTwo)).toEqual(2020);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(2000);
    await expect(account.fetchBalance()).resolves.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(2000);
    await expect(account.fetchBalance()).resolves.toEqual(18);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(2000);
    await expect(account.synchronizeBalance()).rejects.toThrow();
    await expect(account.synchronizeBalance()).rejects.toThrow('Synchronization failed');
  });
});
