import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';
import lodash from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(75)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(0);
    expect(() => account1.transfer(150, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(200);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(50);
    const depositAmount = 25;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(50 + depositAmount); // expect 75
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    const withdrawalAmount = 40;
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(100 - withdrawalAmount); // expect 60
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(20);
    const transferAmount = 30;
    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(70);
    expect(account2.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = getBankAccount(100);
    const random = jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    const ftchblnc = await account.fetchBalance();
    expect(random).toHaveBeenCalledTimes(2);
    expect(ftchblnc).toEqual(expect.any(Number));
    expect(ftchblnc).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(300);
    const random = jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    await account.synchronizeBalance();
    expect(random).toHaveBeenCalledTimes(2);
    const newBalance = account.getBalance();
    expect(newBalance).toEqual(expect.any(Number));
    expect(newBalance).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(300);
    const random = jest.spyOn(lodash, 'random').mockImplementation(() => 0);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(random).toHaveBeenCalledTimes(2);
  });
});
