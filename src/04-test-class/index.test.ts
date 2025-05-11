// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let randomSpy: jest.SpyInstance;
  beforeEach(() => {
    randomSpy = jest.spyOn(lodash, 'random');
  });

  afterEach(() => {
    randomSpy.mockRestore();
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(60, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newAccount = getBankAccount(100).deposit(50);
    expect(newAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const newAccount = getBankAccount(100).withdraw(30);
    expect(newAccount.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(200);
    const account2 = getBankAccount(50);
    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(100);
    expect(account2.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    randomSpy.mockReturnValueOnce(55).mockReturnValueOnce(1);
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();
    expect(balance).toBe(55);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    randomSpy.mockReturnValueOnce(150).mockReturnValueOnce(1);
    const account = getBankAccount(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(150);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    randomSpy.mockReturnValueOnce(73).mockReturnValueOnce(0);
    const account = getBankAccount(100);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
