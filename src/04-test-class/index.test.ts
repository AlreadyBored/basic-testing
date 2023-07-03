// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 600;
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.withdraw(initialBalance + 10);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 500;
    const acc1 = getBankAccount(initialBalance);
    const acc2 = getBankAccount(initialBalance);

    expect(() => {
      acc1.transfer(initialBalance + 10, acc2);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 500;
    const acc = getBankAccount(initialBalance);

    expect(() => {
      acc.transfer(50, acc);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 500;
    const depositAmount = 50;
    const acc = getBankAccount(initialBalance);

    acc.deposit(depositAmount);

    expect(acc.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 500;
    const withdrawAmount = 10;
    const acc = getBankAccount(initialBalance);

    acc.withdraw(withdrawAmount);

    expect(acc.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 400;
    const initialBalance2 = 300;
    const transferAmount = 60;
    const acc1 = getBankAccount(initialBalance1);
    const acc2 = getBankAccount(initialBalance2);

    acc1.transfer(transferAmount, acc2);

    expect(acc1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(acc2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(400);

    const balance = await acc.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(600);
    const balance = 50;

    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(balance);

    await acc.synchronizeBalance();

    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(100);

    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);

    await expect(acc.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
