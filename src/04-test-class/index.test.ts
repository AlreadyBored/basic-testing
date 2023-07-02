import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import requireActual = jest.requireActual;

jest.unmock('lodash');
const lodash = requireActual('lodash');
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 24;
    const acc = new BankAccount(initialBalance);
    expect(acc.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = new BankAccount(24);
    expect(() => acc.withdraw(25)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = new BankAccount(24);
    const secondAcc = new BankAccount(0);
    expect(() => acc.transfer(25, secondAcc)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = new BankAccount(24);
    expect(() => acc.transfer(10, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = new BankAccount(24);
    const amount = 10;
    acc.deposit(amount);
    expect(acc.getBalance()).toBe(34);
  });

  test('should withdraw money', () => {
    const acc = new BankAccount(24);
    const amount = 10;
    acc.withdraw(amount);
    expect(acc.getBalance()).toBe(14);
  });

  test('should transfer money', () => {
    const acc = new BankAccount(24);
    const secondAcc = new BankAccount(0);
    const amount = 10;
    acc.transfer(amount, secondAcc);
    expect(acc.getBalance()).toBe(14);
    expect(secondAcc.getBalance()).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = new BankAccount(24);
    lodash.random = jest.fn().mockReturnValueOnce(50).mockReturnValueOnce(1);
    const balance = await acc.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = new BankAccount(24);
    lodash.random = jest.fn().mockReturnValueOnce(50).mockReturnValueOnce(1);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = new BankAccount(24);
    lodash.random = jest.fn().mockReturnValueOnce(50).mockReturnValueOnce(0);
    await expect(async () => await acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
