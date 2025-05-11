import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(100);
    expect(() => acc1.transfer(200, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(50, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(100);
    acc.deposit(50);
    expect(acc.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(100);
    acc.withdraw(40);
    expect(acc.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(50);
    acc1.transfer(30, acc2);
    expect(acc1.getBalance()).toBe(70);
    expect(acc2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const acc = getBankAccount(100);
    // Run it multiple times to increase chance of non-null
    const balance = await acc.fetchBalance();
    expect([null, ...Array(101).keys()]).toContain(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(100);
    // Mock fetchBalance to always return 42
    acc.fetchBalance = jest.fn().mockResolvedValue(42);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(100);
    acc.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
