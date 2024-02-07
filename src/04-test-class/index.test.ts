// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const initial_balance = 10;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(new BankAccount(initial_balance).getBalance()).toEqual(
      initial_balance,
    );
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      getBankAccount(0).withdraw(initial_balance);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      getBankAccount(0).transfer(initial_balance, getBankAccount(0));
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(initial_balance);
    expect(() => {
      account.transfer(initial_balance, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(
      getBankAccount(initial_balance).deposit(initial_balance).getBalance(),
    ).toEqual(initial_balance * 2);
  });

  test('should withdraw money', () => {
    expect(
      getBankAccount(initial_balance).withdraw(initial_balance).getBalance(),
    ).toEqual(0);
  });

  test('should transfer money', () => {
    const sourceAccount = getBankAccount(initial_balance);
    const destAccount = getBankAccount(0);

    expect(
      sourceAccount.transfer(initial_balance, destAccount).getBalance(),
    ).toEqual(0);
    expect(destAccount.getBalance()).toEqual(initial_balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(initial_balance);
    const balance = account.fetchBalance();
    expect(balance).resolves.toBeDefined();
    balance.then((value) => {
      if (value !== null) {
        expect(value).toStrictEqual(expect.any(Number));
      }
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(initial_balance);
    account.fetchBalance = jest.fn(async () => 10);
    await account.synchronizeBalance();
    expect(account.getBalance()).toStrictEqual(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initial_balance);
    account.fetchBalance = jest.fn(async () => null);
    expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
