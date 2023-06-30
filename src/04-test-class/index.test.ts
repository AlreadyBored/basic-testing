// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  const initialBalance = 100;
  let account: BankAccount;
  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', () => {
    const balance = account.getBalance();
    expect(balance).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(initialBalance);
    expect(() => account.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(200, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.deposit(100).getBalance()).toEqual(200);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(100).getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const withdrawalAmount = 50;
    const account2 = getBankAccount(initialBalance);
    account.transfer(withdrawalAmount, account2);
    expect(account.getBalance()).toEqual(initialBalance - withdrawalAmount);
    expect(account2.getBalance()).toEqual(initialBalance + withdrawalAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(50).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(50).mockReturnValueOnce(1);
    expect(await account.fetchBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = jest.fn(() => Promise.resolve(null));
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
