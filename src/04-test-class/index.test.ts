// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(345).getBalance()).toBe(345);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(444).withdraw(445)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(444).transfer(449, getBankAccount(667)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(444);
    expect(() => account.transfer(444, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(4);
    expect(account.deposit(4).getBalance()).toBe(8);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(5);
    expect(account.withdraw(4).getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(10);
    const account2 = getBankAccount(0);
    account1.transfer(5, account2);
    expect(account2.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    await expect(getBankAccount(222).fetchBalance()).resolves.toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(222);
    const oldBalance = account.getBalance();
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).not.toBe(oldBalance);
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(123);
    jest.spyOn(account, 'fetchBalance').mockImplementation(() => Promise.resolve(null));
    await expect(() => account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
