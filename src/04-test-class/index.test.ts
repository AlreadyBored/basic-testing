import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

const BALANCE_VALUE = 1000;
const TRANSFER_VALUE = 500;
const NEW_BALANCE = 2500;

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let firstAccount: BankAccount;
  let secondAccount: BankAccount;

  beforeEach(() => {
    firstAccount = getBankAccount(BALANCE_VALUE);
    secondAccount = getBankAccount(200);
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const balance = firstAccount.getBalance();
    expect(balance).toBe(BALANCE_VALUE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(BALANCE_VALUE);

    expect(() => bankAccount.withdraw(BALANCE_VALUE + 10)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = firstAccount.getBalance();

    expect(() =>
      firstAccount.transfer(BALANCE_VALUE + 10, secondAccount),
    ).toThrowError(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => firstAccount.transfer(1, firstAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(firstAccount.deposit(TRANSFER_VALUE).getBalance()).toBe(
      BALANCE_VALUE + TRANSFER_VALUE,
    );
  });

  test('should withdraw money', () => {
    expect(firstAccount.withdraw(TRANSFER_VALUE).getBalance()).toBe(
      BALANCE_VALUE - TRANSFER_VALUE,
    );
  });

  test('should transfer money', () => {
    expect(
      firstAccount.transfer(TRANSFER_VALUE, secondAccount).getBalance(),
    ).toBe(BALANCE_VALUE - TRANSFER_VALUE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.mocked(random).mockReturnValue(1);
    const balance = await firstAccount.fetchBalance();

    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(firstAccount, 'fetchBalance').mockResolvedValueOnce(NEW_BALANCE);
    await firstAccount.synchronizeBalance();
    const myBalance = firstAccount.getBalance();
    expect(myBalance).toBe(NEW_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(firstAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(firstAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
