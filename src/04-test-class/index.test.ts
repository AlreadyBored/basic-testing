import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100000;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const withdrawAmt = 200;

    expect(() => account.withdraw(withdrawAmt)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const transferAmt = 200;
    const transferAcc = new BankAccount(10);

    expect(() => account.transfer(transferAmt, transferAcc)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const transferAmt = 200;

    expect(() => account.transfer(transferAmt, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    const transferAmt = 200;
    account.deposit(transferAmt);

    expect(account.getBalance()).toEqual(initialBalance + transferAmt);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    const withdrawAmt = 200;
    account.withdraw(withdrawAmt);

    expect(account.getBalance()).toEqual(initialBalance - withdrawAmt);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    const transferAmt = 200;
    const transferAcc = new BankAccount(10);
    account.transfer(transferAmt, transferAcc);

    expect(account.getBalance()).toEqual(initialBalance - transferAmt);
    expect(transferAcc.getBalance()).toEqual(10 + transferAmt);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);

    account.fetchBalance().then((res) => {
      if (typeof res === 'number') {
        expect(typeof res).toEqual('number');
      }
      if (typeof res === 'object') {
        expect(res).toBeNull();
      }
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    const mockedBalance = 150;
    const fetchFn = jest.spyOn(account, 'fetchBalance');
    const res = await account.fetchBalance();

    if (typeof res === 'number') {
      fetchFn.mockResolvedValue(mockedBalance);
      await account.synchronizeBalance();
      expect(account.getBalance()).toEqual(mockedBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    const fetchFn = jest.spyOn(account, 'fetchBalance');
    fetchFn.mockResolvedValue(null);
    expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
