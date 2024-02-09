import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const newAccount = new BankAccount(initialBalance);
    expect(newAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const curBalance = getBankAccount(500);
    const withdrawAmount = 700;
    expect(() => curBalance.withdraw(withdrawAmount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const curBalance = getBankAccount(500);
    const transferBalance = 700;
    const directionAccount = new BankAccount(0);
    expect(() =>
      curBalance.transfer(transferBalance, directionAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const curBalance = getBankAccount(500);
    const transferBalance = 700;
    expect(() => curBalance.transfer(transferBalance, curBalance)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const curBalance = getBankAccount(500);
    const depositAmount = 200;
    curBalance.deposit(depositAmount);
    expect(curBalance.getBalance()).toBe(700);
  });

  test('should withdraw money', () => {
    const curBalance = getBankAccount(500);
    const withdraeAmount = 200;
    curBalance.withdraw(withdraeAmount);
    expect(curBalance.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    const curBalance = getBankAccount(500);
    const transferAmount = 200;
    const directionAccount = new BankAccount(0);
    curBalance.transfer(transferAmount, directionAccount);
    expect(curBalance.getBalance()).toBe(300);
    expect(directionAccount.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const curBalance = getBankAccount(500);

    curBalance.fetchBalance = jest.fn().mockResolvedValue(200);
    const balance = await curBalance.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const curBalance = getBankAccount(500);
    curBalance.fetchBalance = jest.fn().mockResolvedValue(200);
    await curBalance.synchronizeBalance();
    expect(curBalance.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const curBalance = getBankAccount(500);
    curBalance.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(curBalance.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
