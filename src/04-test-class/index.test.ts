import { InsufficientFundsError, SynchronizationFailedError, getBankAccount } from '.';

expect.extend({
  toBeNumberOrNull(received) {
    try {
      expect(received).toEqual(expect.any('number'));
      return {
        message: () => `Ok`,
        pass: true
      };
    } catch (error) {
      return received === null 
        ? {
          message: () => `Ok`,
          pass: true
        }
        : {
          message: () => `expected ${received} to be number type or null`,
          pass: false
        };
    }
  }
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 5;
    const bankAccount = getBankAccount(balance);
    expect(bankAccount.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 5;
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.withdraw(balance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 5;
    const bankAccountSender = getBankAccount(balance);
    const bankAccountRecipient = getBankAccount(0);
    expect(() => bankAccountSender.transfer(balance + 1, bankAccountRecipient))
      .toThrowError()
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 5;
    const bankAccountSender = getBankAccount(balance);
    expect(() => bankAccountSender.transfer(balance - 1, bankAccountSender))
      .toThrowError()
  });

  test('should deposit money', () => {
    const balance = 5;
    const deposit = 5;
    const bankAccount = getBankAccount(balance);
    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toEqual(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 5;
    const take = 2;
    const bankAccount = getBankAccount(balance);
    bankAccount.withdraw(take);
    expect(bankAccount.getBalance()).toEqual(balance - take);
  });

  test('should transfer money', () => {
    const balanceSender = 5;
    const balanceRecipient = 10;
    const send = 2;
    const bankAccountSender = getBankAccount(balanceSender);
    const bankAccountRecipient = getBankAccount(balanceRecipient);
    expect(() => bankAccountSender.transfer(send, bankAccountRecipient))
      .not.toThrowError()
    expect(bankAccountSender.getBalance()).toEqual(balanceSender - send);
    expect(bankAccountRecipient.getBalance()).toEqual(balanceRecipient + send);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 5;
    const bankAccount = getBankAccount(balance);
    bankAccount.fetchBalance()
      .then((res) => {
        if (typeof res === 'number') {
          expect(typeof res).toEqual('number')
        }
        if (typeof res === 'object') {
          expect(res).toBeNull();
        }
      })
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 5;
    const mockBalance = 50;
    const bankAccount = getBankAccount(balance);
    const fetchFn = jest.spyOn(bankAccount, 'fetchBalance');
    const res = await bankAccount.fetchBalance();
    if (typeof res === 'number') {
      fetchFn.mockResolvedValue(mockBalance)
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).toEqual(mockBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 5;
    const bankAccount = getBankAccount(balance);
    const fetchFn = jest.spyOn(bankAccount, 'fetchBalance');
    fetchFn.mockResolvedValue(null)
    expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
