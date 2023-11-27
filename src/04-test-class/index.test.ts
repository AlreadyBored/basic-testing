import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 50;
    const withdrawalAmount = 100;
    const account = getBankAccount(initialBalance);

    expect(() => account.withdraw(withdrawalAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const senderInitialBalance = 250;
    const receiverInitialBalance = 230;
    const transferAmount = 300;

    const senderAccount = getBankAccount(senderInitialBalance);
    const receiverAccount = getBankAccount(receiverInitialBalance);

    expect(() =>
      senderAccount.transfer(transferAmount, receiverAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 50;
    const transferAmount = 30;

    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 190;
    const depositAmount = 100;
    const account = getBankAccount(initialBalance);

    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 162;
    const withdrawalAmount = 88;
    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const senderInitialBalance = 50;
    const receiverInitialBalance = 30;
    const transferAmount = 20;

    const senderAccount = getBankAccount(senderInitialBalance);
    const receiverAccount = getBankAccount(receiverInitialBalance);

    senderAccount.transfer(transferAmount, receiverAccount);

    expect(senderAccount.getBalance()).toBe(
      senderInitialBalance - transferAmount,
    );
    expect(receiverAccount.getBalance()).toBe(
      receiverInitialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(50);
    const balance = await account.fetchBalance();

    expect(typeof balance === 'number' || balance === null).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(50);
    const newBalance = 80;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(50);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
