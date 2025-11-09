// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(99);

    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 99',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(99);
    const account2 = getBankAccount(1);

    expect(() => account1.transfer(100, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(99);

    expect(() => account.transfer(99, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(100);

    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);

    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(100);

    account1.transfer(50, account2);

    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    const balance = await account.fetchBalance();

    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(75);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(75);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
