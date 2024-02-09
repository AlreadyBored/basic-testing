import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from './index';

describe('BankAccount', () => {
  let balance: Parameters<typeof getBankAccount>[0];
  let bankAccount: BankAccount;

  beforeEach(() => {
    balance = 999;
    bankAccount = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(balance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(balance + 1, getBankAccount(balance)),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(balance + 1, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositBalance = 1000;
    bankAccount.deposit(1000);

    expect(bankAccount.getBalance()).toBe(depositBalance + balance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 99;
    bankAccount.withdraw(withdrawAmount);

    expect(bankAccount.getBalance()).toBe(balance - withdrawAmount);
  });

  test('should transfer money', () => {
    const secondBankAccountBalance = 200;
    const secondBankAccount = getBankAccount(secondBankAccountBalance);
    const transferredAmount = 99;

    bankAccount.transfer(99, secondBankAccount);

    expect(bankAccount.getBalance()).toBe(balance - transferredAmount);
    expect(secondBankAccount.getBalance()).toBe(
      secondBankAccountBalance + transferredAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const data = await bankAccount.fetchBalance();
    if (data !== null) expect(typeof data).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedAmount = 50;
    const spy = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValue(fetchedAmount);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(fetchedAmount);

    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchedResult = null;
    const spy = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValue(fetchedResult);

    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );

    spy.mockRestore();
  });
});
