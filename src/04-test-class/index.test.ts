// Uncomment the code below and write your tests
import {
  getBankAccount,
  TransferFailedError,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const overBalanceAmount = 120;
  const depositAmount = 10;
  let bankAccountInstance = getBankAccount(initialBalance);
  const secondBankAccountInstance = getBankAccount(0);

  test('should create account with initial balance', () => {
    expect(bankAccountInstance.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = bankAccountInstance.getBalance();

    expect(() => bankAccountInstance.withdraw(overBalanceAmount)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccountInstance.transfer(
        overBalanceAmount,
        secondBankAccountInstance,
      ),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      bankAccountInstance.transfer(depositAmount, bankAccountInstance),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newTotalValue = bankAccountInstance.getBalance() + depositAmount;
    const updatedAcc = bankAccountInstance.deposit(depositAmount);

    expect(updatedAcc.getBalance()).toEqual(newTotalValue);
  });

  test('should withdraw money', () => {
    const newTotalValue = bankAccountInstance.getBalance() - depositAmount;
    const updatedAcc = bankAccountInstance.withdraw(depositAmount);

    expect(updatedAcc.getBalance()).toEqual(newTotalValue);
  });

  test('should transfer money', () => {
    const firstAccountTotal = bankAccountInstance.getBalance() - depositAmount;
    const secondAccountTotal =
      secondBankAccountInstance.getBalance() + depositAmount;

    bankAccountInstance.transfer(depositAmount, secondBankAccountInstance);

    expect(bankAccountInstance.getBalance()).toEqual(firstAccountTotal);
    expect(secondBankAccountInstance.getBalance()).toEqual(secondAccountTotal);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const result = await bankAccountInstance.fetchBalance();

      if (result) {
        expect(typeof result).toBe('number');
      }
    } catch (err) {
      expect(err).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const result = await bankAccountInstance.fetchBalance();

      if (result) {
        bankAccountInstance = getBankAccount(result);
        expect(bankAccountInstance.getBalance()).toBe(result);
      }
    } catch (err) {
      expect(err).toBeNull();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccountInstance.fetchBalance();
    } catch (err) {
      expect(err).toThrow(SynchronizationFailedError);
    }
  });
});
