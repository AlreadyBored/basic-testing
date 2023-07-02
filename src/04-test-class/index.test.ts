import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError,} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(0);
    expect(() => account.withdraw(2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sender = getBankAccount(0);
    const beneficiary = getBankAccount(0);
    expect(() => sender.transfer(1, beneficiary)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const sender = getBankAccount(1);
    expect(() => sender.transfer(1, sender)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initValue = 1;
    const value = 2;
    const account = getBankAccount(initValue);
    account.deposit(value);
    expect(account.getBalance()).toBe(initValue + value);
  });

  test('should withdraw money', () => {
    const initValue = 2;
    const value = 1;
    const account = getBankAccount(initValue);
    expect(account.withdraw(value).getBalance()).toBe(initValue - value);
  });

  test('should transfer money', () => {
    const value = 1;
    const senderValue = 100;
    const beneficiaryValue = 100;
    const sender = getBankAccount(senderValue);
    const beneficiary = getBankAccount(beneficiaryValue);
    sender.transfer(value, beneficiary);

    expect(sender.getBalance()).toBe(senderValue - value);
    expect(beneficiary.getBalance()).toBe(beneficiaryValue + value);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1);
    const balance = account.fetchBalance();
    console.log(typeof balance);
    balance
    .then(() => expect(typeof balance).toBe('number'))
    .catch(() => console.log(typeof balance));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 1;
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
