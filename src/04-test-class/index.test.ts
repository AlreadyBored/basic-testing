// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';
jest.unmock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    expect(getBankAccount(initialBalance)).toEqual(bank);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    expect(() => {
      bank.withdraw(1001);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    expect(() => {
      bank.transfer(1001, new BankAccount(700));
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    expect(() => {
      bank.transfer(10, bank);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    const result = bank.deposit(1000);
    expect(result).toEqual(bank);
  });

  test('should withdraw money', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    const result = bank.withdraw(100);
    expect(result).toEqual(bank);
  });

  test('should transfer money', () => {
    // Write your test here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    const result = bank.transfer(100, new BankAccount(7000));
    expect(result).toEqual(bank);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    lodash.random = jest.fn(() => 42);
    const balance = await bank.fetchBalance();
    expect(balance).toEqual(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    lodash.random = jest.fn(() => 42);
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    await bank.synchronizeBalance();
    expect(getBankAccount(42)).toEqual(bank);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    lodash.random = jest.fn(() => 0);
    const initialBalance = 1000;
    const bank = new BankAccount(initialBalance);
    await expect(async () => {
      await bank.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
