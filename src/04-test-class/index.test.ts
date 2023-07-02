import { TIMEOUT_TEST } from 'utils';
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

const INITIAL_BALANCE = 500;

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    jest.resetModules();
    bankAccount = getBankAccount(INITIAL_BALANCE);
  });

  test(
    'should create account with initial balance',
    () => {
      expect(bankAccount).toBeInstanceOf(BankAccount);
      expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
    },
    TIMEOUT_TEST,
  );

  test(
    'should throw InsufficientFundsError error when withdrawing more than balance',
    () => {
      expect(() => bankAccount.withdraw(INITIAL_BALANCE * 2)).toThrowError(
        InsufficientFundsError,
      );
    },
    TIMEOUT_TEST,
  );

  test(
    'should throw error when transferring more than balance',
    () => {
      const friendsBankAccount = new BankAccount(0);

      expect(() =>
        bankAccount.transfer(INITIAL_BALANCE * 2, friendsBankAccount),
      ).toThrowError(InsufficientFundsError);
    },
    TIMEOUT_TEST,
  );

  test(
    'should throw error when transferring to the same account',
    () => {
      expect(() =>
        bankAccount.transfer(INITIAL_BALANCE / 2, bankAccount),
      ).toThrowError(TransferFailedError);
    },
    TIMEOUT_TEST,
  );

  test(
    'should deposit money',
    () => {
      const deposit = INITIAL_BALANCE / 2;
      bankAccount.deposit(deposit);
      expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE + deposit);
    },
    TIMEOUT_TEST,
  );

  test(
    'should withdraw money',
    () => {
      bankAccount.withdraw(INITIAL_BALANCE);
      expect(bankAccount.getBalance()).toBe(0);
    },
    TIMEOUT_TEST,
  );

  test(
    'should transfer money',
    () => {
      const friendsBankAccount = new BankAccount(0);
      bankAccount.transfer(INITIAL_BALANCE, friendsBankAccount);
      expect(friendsBankAccount.getBalance()).toBe(INITIAL_BALANCE);
    },
    TIMEOUT_TEST,
  );

  test(
    'fetchBalance should return number in case if request did not failed',
    async () => {
      const mBalance = 98;
      jest.spyOn(lodash, 'random').mockImplementation(() => mBalance);

      expect(await bankAccount.fetchBalance()).toBe(mBalance);
    },
    TIMEOUT_TEST,
  );

  test('should set new balance if fetchBalance returned number', async () => {
    const mBalance = 11;

    jest.spyOn(lodash, 'random').mockImplementation(() => mBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(mBalance);
  });

  test(
    'should throw SynchronizationFailedError if fetchBalance returned null',
    async () => {
      jest.spyOn(lodash, 'random').mockImplementation(() => 0);

      await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
        SynchronizationFailedError,
      );
    },
    TIMEOUT_TEST,
  );
});
