import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    expect(acc.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    const withdraw = balance + 1;
    expect(() => acc.withdraw(withdraw)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    const accToTransfer = getBankAccount(0);
    const transfer = balance + 1;
    expect(() => acc.transfer(transfer, accToTransfer)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    expect(() => acc.transfer(balance, acc)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    const deposit = 20;
    acc.deposit(deposit);
    expect(acc.getBalance()).toEqual(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const toWithdraw = 20;
    const acc = getBankAccount(balance);
    acc.withdraw(toWithdraw);
    expect(acc.getBalance()).toEqual(balance - toWithdraw);
  });

  test('should transfer money', () => {
    const balance1 = 100;
    const balance2 = 50;
    const acc1 = getBankAccount(balance1);
    const acc2 = getBankAccount(balance2);
    const toTransfer = 50;
    acc1.transfer(toTransfer, acc2);
    expect(acc1.getBalance()).toEqual(balance1 - toTransfer);
    expect(acc2.getBalance()).toEqual(balance2 + toTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    const fetchedBalance = await acc.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
    expect(Number.isInteger(fetchedBalance)).toBe(true);
    expect(fetchedBalance).toBeGreaterThanOrEqual(0);
    expect(fetchedBalance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    const acc = getBankAccount(balance);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).not.toEqual(null);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(0);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });

});
