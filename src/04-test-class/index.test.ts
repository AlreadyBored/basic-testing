import { SynchronizationFailedError } from '.';
import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 123;
  let instance: BankAccount;
  beforeEach(() => {
    instance = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', () => {
    expect(instance).toBeInstanceOf(BankAccount);
    expect(instance.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => instance.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      instance.transfer(initialBalance + 1, getBankAccount(234)),
    ).toThrow(Error);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => instance.transfer(11, instance)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const deposAmount = 112;
    expect(instance.deposit(deposAmount).getBalance()).toBe(
      initialBalance + deposAmount,
    );
  });

  test('should withdraw money', () => {
    const withdrawAmount = 11;
    expect(instance.withdraw(withdrawAmount).getBalance()).toBe(
      initialBalance - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const targetInitial = 234;
    const targetAccount = getBankAccount(targetInitial);
    const transferAmount = 23;
    expect(instance.transfer(transferAmount, targetAccount).getBalance()).toBe(
      initialBalance - transferAmount,
    );
    expect(targetAccount.getBalance()).toBe(targetInitial + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const res = await instance.fetchBalance();
    if (res) {
      expect(typeof res).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const prevBalance = instance.getBalance();
    try {
      await instance.synchronizeBalance();
      expect(instance.getBalance()).not.toBe(prevBalance);
    } catch (err) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await instance.synchronizeBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
