import _ from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);

    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(20);

    expect(() => bankAccount.withdraw(21)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(20);
    const anotherBankAccount = getBankAccount(10);

    expect(() => bankAccount.transfer(21, anotherBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(20);

    expect(() => bankAccount.transfer(20, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 20;
    const deposit = 10;
    const bankAccount = new BankAccount(balance);

    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 20;
    const withdrawal = 10;
    const bankAccount = new BankAccount(balance);

    bankAccount.withdraw(10);
    expect(bankAccount.getBalance()).toBe(balance - withdrawal);
  });

  test('should transfer money', () => {
    const balanceA = 100;
    const accountA = new BankAccount(balanceA);
    const transferSum = 10;

    const balanceB = 20;
    const accountB = new BankAccount(balanceB);

    accountA.transfer(transferSum, accountB);
    expect(accountA.getBalance()).toBe(balanceA - transferSum);
    expect(accountB.getBalance()).toBe(balanceB + transferSum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);
    const bankAccount = new BankAccount(100);

    await expect(bankAccount.fetchBalance()).resolves.toEqual(
      expect.any(Number),
    );

    jest.spyOn(_, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = 10;
    const bankAccount = new BankAccount(100);

    bankAccount.fetchBalance = jest.fn(async () => fetchedBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = new BankAccount(100);

    bankAccount.fetchBalance = jest.fn(async () => null);
    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
