// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  beforeEach(() => {
    account = getBankAccount(500);
  });
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => account.withdraw(600)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(600, getBankAccount(300))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(700, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(300);
    expect(account.getBalance()).toBe(800);
  });

  test('should withdraw money', () => {
    account.withdraw(200);
    expect(account.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    // Write your test here
    const transferAcc = getBankAccount(300);
    account.transfer(200, transferAcc);
    expect(transferAcc.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    await expect(account.fetchBalance()).resolves.toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
