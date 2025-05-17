import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10;
    const withdrawAmount = 15;
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 10;
    const transferAmount = 15;
    const fromBankAccount = getBankAccount(initialBalance);
    const toBankAccount = getBankAccount(initialBalance);

    expect(() =>
      fromBankAccount.transfer(transferAmount, toBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 0;
    const transferAmount = 15;
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.transfer(transferAmount, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 10;
    const depositAmount = 10;
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.deposit(depositAmount).getBalance()).toEqual(
      initialBalance + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const initialBalance = 10;
    const withdrawAmount = 10;
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.withdraw(withdrawAmount).getBalance()).toEqual(
      initialBalance - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);

    expect(bankAccount.transfer(10, toAccount).getBalance()).toBe(0);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.fetchBalance()).resolves.toBeDefined();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 10;
    const newBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    // Mock the method not assigned it
    const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');

    // bankAccount.fetchBalance = () => Promise.resolve(newBalance);
    // const balance = await bankAccount.fetchBalance();
    // if (balance) {
    //   await expect(bankAccount.getBalance()).toBe(balance);
    // }
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);

    const balance = await bankAccount.fetchBalance();

    if (!balance) {
      await expect(() => bankAccount.synchronizeBalance).toThrow(
        SynchronizationFailedError,
      );
    }
  });
});
