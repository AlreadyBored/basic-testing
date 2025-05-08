import _ from 'lodash';
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(100);
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(40);
    expect(() => acc.withdraw(60)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(30);
    const acc2 = getBankAccount(0);

    expect(() => acc1.transfer(50, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(40);
    expect(() => acc.transfer(100, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(50);
    acc.deposit(50);
    expect(acc.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(50);
    acc.withdraw(30);
    expect(acc.getBalance()).toBe(20);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(50);
    acc1.transfer(30, acc2);
    expect(acc1.getBalance()).toBe(70);
    expect(acc2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(_, 'random').mockReturnValue(55);

    await expect(acc.fetchBalance()).resolves.toBe(55);

    jest.spyOn(_, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(_, 'random').mockReturnValue(125);

    await acc.synchronizeBalance();

    expect(acc.getBalance()).toBe(125);

    jest.spyOn(_, 'random').mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValue(42);
    const acc = getBankAccount(100);
    const result = await acc.fetchBalance();

    expect(result).toBe(42);
    expect(randomSpy).toHaveBeenCalled();
  });
});
