import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const source = getBankAccount(50);
    const target = getBankAccount(0);
    expect(() => source.transfer(100, target)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(40);
    expect(account.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const source = getBankAccount(100);
    const target = getBankAccount(20);
    source.transfer(30, target);
    expect(source.getBalance()).toBe(70);
    expect(target.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(42);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
    expect(result).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(77);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(77);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
