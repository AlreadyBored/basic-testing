// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  getBankAccount,
  SynchronizationFailedError,
} from './';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    expect(() => account.withdraw(initialBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    expect(() => account1.transfer(200, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const withdrawAmount = 50;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    const transferAmount = 50;
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(10);
    const foo = jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    foo.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const otherBankAcc = getBankAccount(0);
    jest
      .spyOn(otherBankAcc, 'fetchBalance')
      .mockReturnValue(new Promise((res) => res(200)));
    await otherBankAcc.synchronizeBalance();
    expect(otherBankAcc.getBalance()).toEqual(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
