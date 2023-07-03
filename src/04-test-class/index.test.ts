import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 100;
  const deposit = 100;
  const withdrawAmount = 100;
  const account = getBankAccount(initialBalance);
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(150, getBankAccount(100))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newBalance = account.deposit(deposit).getBalance();
    expect(newBalance).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const newBalance = account.withdraw(withdrawAmount).getBalance();
    expect(newBalance).toBe(initialBalance - withdrawAmount + deposit);
  });

  test('should transfer money', () => {
    expect(() => account.transfer(50, getBankAccount(50))).not.toThrow();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1).mockImplementationOnce(() => 50);
    expect(await account.fetchBalance()).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const oldBalance = account.getBalance();
    await account.synchronizeBalance();
    const newBalance = account.getBalance();
    expect(oldBalance).not.toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = jest.fn(() => Promise.resolve(null));
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
