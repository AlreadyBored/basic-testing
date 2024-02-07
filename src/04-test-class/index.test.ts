import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  // SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const showMeTheMoney = (max = 100) => Math.floor(Math.random() * max) + 1; // random number from 1 to max
  let balance: number;
  let account: ReturnType<typeof getBankAccount>;

  beforeEach(() => {
    balance = showMeTheMoney();
    account = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(balance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      account.transfer(balance + 1, getBankAccount(showMeTheMoney())),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const deposit = showMeTheMoney();
    expect(account.deposit(deposit).getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(1).getBalance()).toBe(balance - 1);
  });

  test('should transfer money', () => {
    const transferTo = getBankAccount(0);
    account.transfer(balance, transferTo);

    expect(account.getBalance()).toBe(0);
    expect(transferTo.getBalance()).toBe(balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
