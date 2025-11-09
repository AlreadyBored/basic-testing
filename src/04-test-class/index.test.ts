import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountA = getBankAccount(50);
    const accountB = getBankAccount(50);
    expect(() => accountA.transfer(100, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(50);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(10, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(50);
    account.deposit(30);
    expect(account.getBalance()).toBe(80);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(50);
    account.withdraw(20);
    expect(account.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(100);
    const accountB = getBankAccount(50);
    accountA.transfer(40, accountB);
    expect(accountA.getBalance()).toBe(60);
    expect(accountB.getBalance()).toBe(90);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomSpy = jest.spyOn(lodash, 'random');

    randomSpy.mockReturnValueOnce(42).mockReturnValueOnce(1);
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();
    expect(balance).toBe(42);

    randomSpy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const randomSpy = jest.spyOn(lodash, 'random');

    randomSpy.mockReturnValueOnce(75).mockReturnValueOnce(1);
    const account = getBankAccount(0);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(75);

    randomSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
