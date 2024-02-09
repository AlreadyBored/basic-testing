import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const INITIAL_VALUE = 1002;
  const myBankAccount = getBankAccount(INITIAL_VALUE);
  const otherAccount = getBankAccount(1);
  test('should create account with initial balance', () => {
    expect(myBankAccount.getBalance()).toBe(INITIAL_VALUE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 1200;
    expect(() => myBankAccount.withdraw(withdrawAmount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 1500;

    expect(() =>
      myBankAccount.transfer(transferAmount, otherAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 1500;
    expect(() =>
      myBankAccount.transfer(transferAmount, myBankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositAmount = 1000;
    expect(myBankAccount.deposit(depositAmount).getBalance()).toBe(
      myBankAccount.getBalance(),
    );
  });

  test('should withdraw money', () => {
    const withdrawAmount = 1000;
    expect(myBankAccount.withdraw(withdrawAmount).getBalance()).toBe(
      myBankAccount.getBalance(),
    );
  });

  test('should transfer money', () => {
    expect(myBankAccount.transfer(1000, otherAccount).getBalance()).toBe(
      myBankAccount.getBalance(),
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(myBankAccount, 'fetchBalance').mockResolvedValueOnce(100);
    const balance = await myBankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(myBankAccount, 'fetchBalance').mockResolvedValueOnce(100);
    await myBankAccount.synchronizeBalance();
    expect(myBankAccount.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(myBankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(myBankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
