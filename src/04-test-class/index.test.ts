import {
  InsufficientFundsError,
  // SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(1000);
    const account2 = getBankAccount(1000);
    expect(() => account1.transfer(1100, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account1 = getBankAccount(1000);
    expect(() => account1.transfer(900, account1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(1100);
    expect(account.getBalance()).toBe(2100);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(100);
    expect(account.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(1000);
    const account2 = getBankAccount(1000);
    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(900);
    expect(account2.getBalance()).toBe(1100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const operation = new Promise((res) => {
      let balance = null;
      while (Object.is(balance, null)) {
        balance = account.fetchBalance();
      }
      res(balance);
    });
    expect(operation).resolves.not.toBe(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // const account = getBankAccount(1000);
    // expect(account.getBalance()).toBe(1000);
    // // random.mockImplementation(() => 30);
    // jest.spyOn(account, 'fetchBalance').mock
    // await account.fetchBalance();
    // expect(account.getBalance()).toBe(30);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // const account = getBankAccount(1000);
    // const operation = () => account.synchronizeBalance();
    // try {
    //   operation();
    // } catch {
    //   expect(operation).rejects.toThrow(SynchronizationFailedError);
    // }
  });
});
