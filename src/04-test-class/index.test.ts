import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 300;
    expect(getBankAccount(initialBalance).getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 300;
    const expectedError = new InsufficientFundsError(initialBalance);

    expect(() =>
      getBankAccount(initialBalance).withdraw(initialBalance + 1),
    ).toThrow(expectedError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 300;
    const expectedError = new InsufficientFundsError(initialBalance);
    const mockAccount = getBankAccount(0);

    expect(() =>
      getBankAccount(initialBalance).transfer(initialBalance + 1, mockAccount),
    ).toThrow(expectedError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 300;
    const expectedError = new TransferFailedError();
    const mockAccount = getBankAccount(initialBalance);

    expect(() => mockAccount.transfer(initialBalance + 1, mockAccount)).toThrow(
      expectedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 300;
    const mockAccount = getBankAccount(initialBalance);

    const depositAmount = 1;
    mockAccount.deposit(depositAmount);

    expect(mockAccount.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 300;
    const mockAccount = getBankAccount(initialBalance);

    const withdrawAmount = 1;
    mockAccount.withdraw(withdrawAmount);

    expect(mockAccount.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalanceAccount1 = 300;
    const initialBalanceAccount2 = 0;
    const transferAmount = 5;
    const mockAccount1 = getBankAccount(initialBalanceAccount1);
    const mockAccount2 = getBankAccount(initialBalanceAccount2);

    mockAccount1.transfer(transferAmount, mockAccount2);

    expect(mockAccount1.getBalance()).toBe(
      initialBalanceAccount1 - transferAmount,
    );
    expect(mockAccount2.getBalance()).toBe(
      initialBalanceAccount2 + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalanceAccount = 300;
    const mockAccount = getBankAccount(initialBalanceAccount);
    const fetchedBalance = await mockAccount.fetchBalance();

    if (fetchedBalance !== null) {
      expect(typeof fetchedBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalanceAccount = 300;
    const syncedAmount = 10;

    const mockAccount = getBankAccount(initialBalanceAccount);
    jest.spyOn(mockAccount, 'fetchBalance').mockResolvedValue(syncedAmount);

    await mockAccount.synchronizeBalance();
    expect(mockAccount.getBalance()).toBe(syncedAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalanceAccount = 300;

    const mockAccount = getBankAccount(initialBalanceAccount);
    jest.spyOn(mockAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(mockAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
