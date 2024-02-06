import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;

    const account = getBankAccount(initialBalance);

    expect(account instanceof BankAccount).toBe(true);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;

    const account = new BankAccount(initialBalance);

    expect(() => account.withdraw(initialBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;

    const account1 = new BankAccount(initialBalance);
    const account2 = new BankAccount(initialBalance);

    expect(() => account1.transfer(initialBalance + 1, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;

    const account = new BankAccount(initialBalance);

    expect(() => account.transfer(initialBalance + 1, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const depositAmount = 100;

    const account = new BankAccount(initialBalance);

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const withdrawAmount = 100;

    const account = new BankAccount(initialBalance);

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const transferAmount = 100;

    const account1 = new BankAccount(initialBalance);
    const account2 = new BankAccount(initialBalance);

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(initialBalance - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const newBalance = 50;
    const account = new BankAccount(initialBalance);
    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValueOnce(newBalance);

    const balance = await account.fetchBalance();

    expect(balance).toBe(newBalance);
    expect(fetchBalanceSpy).toHaveBeenCalled();

    fetchBalanceSpy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const newBalance = 50;
    const account = new BankAccount(initialBalance);
    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValueOnce(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
    expect(fetchBalanceSpy).toHaveBeenCalled();

    fetchBalanceSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );

    expect(fetchBalanceSpy).toHaveBeenCalled();

    fetchBalanceSpy.mockRestore();
  });
});
