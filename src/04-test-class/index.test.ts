// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));
import { random } from 'lodash';
const randomMock = random as jest.MockedFunction<typeof random>;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(200);
    account.withdraw(75);
    expect(account.getBalance()).toBe(125);
  });

  test('should transfer money', () => {
    const from = getBankAccount(300);
    const to = getBankAccount(100);

    from.transfer(120, to);

    expect(from.getBalance()).toBe(180);
    expect(to.getBalance()).toBe(220);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(60)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(40);
    const to = getBankAccount(0);
    expect(() => from.transfer(100, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('fetchBalance should return number when request does NOT fail', async () => {
    randomMock
      .mockImplementationOnce(() => 42) // balance
      .mockImplementationOnce(() => 1); // requestFailed === false
    const account = getBankAccount(0);

    const result = await account.fetchBalance();
    expect(result).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(80);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(80);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
