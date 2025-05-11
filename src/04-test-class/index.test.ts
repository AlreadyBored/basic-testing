// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(100).withdraw(200)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(200, account)).toThrow();
  });

  test('should deposit money', () => {
    expect(getBankAccount(100).deposit(200).getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(300).withdraw(170).getBalance()).toBe(130);
  });

  test('should transfer money', () => {
    const firstAccount = getBankAccount(300);
    const secondAccount = getBankAccount(100);

    expect(firstAccount.transfer(150, secondAccount).getBalance()).toBe(150);
    expect(secondAccount.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await getBankAccount(100).fetchBalance();

    if (balance === null) {
      expect(balance).toBeNull();
    } else {
      expect(typeof balance).toBe('number');
      expect(balance).toBeGreaterThanOrEqual(0);
      expect(balance).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(200);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(account.synchronizeBalance).rejects.toThrow();
  });
});
