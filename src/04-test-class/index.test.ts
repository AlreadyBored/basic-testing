// Uncomment the code below and write your tests
import {
  BankAccount,
  // getBankAccount,
  InsufficientFundsError, SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Очищаем моки после каждого теста
  });

  test('should create account with initial balance', () => {
    // Write your test here
    const account = new BankAccount(777);
    expect(account.getBalance()).toBe(777);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = new BankAccount(777);
    const amount = 888;
    expect(() => account.withdraw(amount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account_send = new BankAccount(777);
    const account_receive = new BankAccount(0);
    const amount = 888;
    expect(() => account_send.transfer(amount, account_receive)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account_send_and_receive = new BankAccount(777);
    const amount = 888;
    expect(() => account_send_and_receive.transfer(amount, account_send_and_receive)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = new BankAccount(0);
    const amount_to_deposit = 333;
    expect(account.deposit(amount_to_deposit).getBalance()).toBe(333);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = new BankAccount(100);
    const amount_to_withdraw = 100;
    expect(account.withdraw(amount_to_withdraw).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    // Write your test here
    const account_send = new BankAccount(777);
    const account_receive = new BankAccount(0);
    const amount = 777;
    // act
    account_send.transfer(amount, account_receive);

    // arrange
    expect(account_send.getBalance()).toBe(0);
    expect(account_receive.getBalance()).toBe(777);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = new BankAccount(777);

    // arrange
    (random as jest.Mock).mockReturnValueOnce(50);
    (random as jest.Mock).mockReturnValueOnce(1);

    // act
    const result = await account.fetchBalance();

    // assert
    expect(result).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    // arrange
    const account = new BankAccount(777);
    const expected_balance = 100;
    (random as jest.Mock).mockReturnValueOnce(expected_balance);
    (random as jest.Mock).mockReturnValueOnce(1);

    // act
    await account.synchronizeBalance();

    // assert
    expect(account.getBalance()).toBe(expected_balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    // arrange
    const account = new BankAccount(777);
    const expected_balance = 100;
    (random as jest.Mock).mockReturnValueOnce(expected_balance);
    (random as jest.Mock).mockReturnValueOnce(0);

    // act
    // assert
    await expect(() => account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
