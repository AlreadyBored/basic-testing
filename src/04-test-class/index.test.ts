// Uncomment the code below and write your tests
import {
  // BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const initialBalance = 1000;
  let account: ReturnType<typeof getBankAccount>;
  let accountDest: ReturnType<typeof getBankAccount>;

  const mockedRandom = random as jest.MockedFunction<typeof random>;

  beforeEach(() => {
    jest.clearAllMocks();
    account = getBankAccount(initialBalance);
    accountDest = getBankAccount(initialBalance / 2);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      account.transfer(account.getBalance() + 1, accountDest),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(account.getBalance() + 1, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    account.deposit(initialBalance);
    expect(account.getBalance()).toBe(initialBalance * 2);
  });

  test('should withdraw money', () => {
    account.withdraw(initialBalance / 2);
    expect(account.getBalance()).toBe(initialBalance / 2);
  });

  test('should transfer money', () => {
    const tempBalance = accountDest.getBalance();
    account.transfer(initialBalance * 0.1, accountDest);
    expect(account.getBalance()).toBe(initialBalance * 0.9);
    expect(accountDest.getBalance()).toBe(tempBalance + initialBalance * 0.1);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    mockedRandom.mockReturnValueOnce(500).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(balance).toBe(500);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(3535);

    await account.synchronizeBalance();
    expect(account.getBalance()).toStrictEqual(3535);
    fetchBalanceMock.mockRestore();
  });
});

test('should throw SynchronizationFailedError if fetchBalance returned null', () => {
  const account = getBankAccount(1100);
  const fetchBalanceMock = jest
    .spyOn(account, 'fetchBalance')
    .mockResolvedValue(null);

  expect(account.synchronizeBalance()).rejects.toThrowError(
    SynchronizationFailedError,
  );
  fetchBalanceMock.mockRestore();
});
