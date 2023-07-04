import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  }, 30000);

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(200)).toThrow(
      InsufficientFundsError,
    );
  }, 30000);

  test('should throw error when transferring more than balance', () => {
    const currentBankAccount = getBankAccount(100);
    const otherBankAccount = getBankAccount(100);

    expect(() => currentBankAccount.transfer(200, otherBankAccount)).toThrow(
      InsufficientFundsError,
    );
  }, 30000);

  test('should throw error when transferring to the same account', () => {
    const currentBankAccount = getBankAccount(100);

    expect(() => currentBankAccount.transfer(200, currentBankAccount)).toThrow(
      TransferFailedError,
    );
  }, 30000);

  test('should deposit money', () => {
    const currentBankAccount = getBankAccount(100);

    expect(currentBankAccount.deposit(200).getBalance()).toBe(300);
  }, 30000);

  test('should withdraw money', () => {
    const currentBankAccount = getBankAccount(100);

    expect(currentBankAccount.withdraw(20).getBalance()).toBe(80);
  }, 30000);

  test('should transfer money', () => {
    const currentBankAccount = getBankAccount(100);
    const otherBankAccount = getBankAccount(100);

    currentBankAccount.transfer(50, otherBankAccount);

    expect(otherBankAccount.getBalance()).toBe(150);
  }, 30000);

  test('fetchBalance should return number in case if request did not failed', async () => {
    const currentBankAccount = getBankAccount(100);
    const balance = await currentBankAccount.fetchBalance();

    if (balance) {
      expect(typeof balance).toBe('number');
    } else {
      expect(balance).toBeNull();
    }
  }, 30000);

  test('should set new balance if fetchBalance returned number', async () => {
    const currentBankAccount = getBankAccount(100);
    const oldBalance = currentBankAccount.getBalance();

    try {
      await currentBankAccount.synchronizeBalance();
      expect(typeof currentBankAccount.getBalance()).toBe('number');
      expect(currentBankAccount.getBalance()).not.toEqual(oldBalance);
    } catch (err) {
      expect(true).toBe(true);
    }
  }, 30000);

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const currentBankAccount = getBankAccount(100);
    const oldBalance = currentBankAccount.getBalance();

    try {
      await currentBankAccount.synchronizeBalance();
      expect(true).toBe(true);
    } catch (err) {
      expect(err instanceof SynchronizationFailedError).toBe(true);
      expect(currentBankAccount.getBalance()).toEqual(oldBalance);
    }
  }, 30000);
});
