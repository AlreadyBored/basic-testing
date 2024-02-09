// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError , SynchronizationFailedError} from '.';

describe('BankAccount', () => {

  let bankAccount: any;
  let balance = 1000;

  beforeEach(() => {
    balance = 1000;
    bankAccount = getBankAccount(balance);
});

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawMoney = 5000;
    try {
      bankAccount.withdraw(withdrawMoney); 
      fail('Expected InsufficientFundsError, but it did not throw any error');
    } catch (error) {
        expect(error).toBeInstanceOf(InsufficientFundsError);
        expect((error as Error).message).toBe(`Insufficient funds: cannot withdraw more than ${balance}`);
    }
  });

  test('should throw error when transferring more than balance', () => {
    const transferMoney = 5000;
    const anotherBankAccount = getBankAccount(500);
    try {
      bankAccount.transfer(transferMoney, anotherBankAccount); 
      fail('Expected InsufficientFundsError, but it did not throw any error');
    } catch (error) {
        expect(error).toBeInstanceOf(InsufficientFundsError);
        expect((error as Error).message).toBe(`Insufficient funds: cannot withdraw more than ${balance}`);
    }
  });

  test('should throw error when transferring to the same account', () => {
    const transferMoney = 5000;
    try {
      bankAccount.transfer(transferMoney, bankAccount); 
      fail('Expected TransferFailedError, but it did not throw any error');
    } catch (error) {
        expect(error).toBeInstanceOf(TransferFailedError);
        expect((error as Error).message).toBe(`Transfer failed`);
    }
  });

  test('should deposit money', () => {
    const depositMoney = 1234;

    const totalAmount = balance + depositMoney;

    expect(bankAccount.deposit(depositMoney).getBalance()).toEqual(totalAmount);
  });

  test('should withdraw money', () => {
    const withdrawMoney = 756;

    const totalAmount = balance - withdrawMoney;

    expect(bankAccount.withdraw(withdrawMoney).getBalance()).toEqual(totalAmount);
  });

  test('should transfer money', () => {
    const transferMoney = 756;
    const totalAmountFirst = balance - transferMoney;
    const newAccountInitialBalance = 500;
    const secondBank = getBankAccount(newAccountInitialBalance);
    const totalAmountSecond = newAccountInitialBalance + transferMoney;

    expect(bankAccount.transfer(transferMoney, secondBank).getBalance()).toEqual(totalAmountFirst);
    expect(secondBank.getBalance()).toEqual(totalAmountSecond);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchBalanceMoney = await bankAccount.fetchBalance();

    if (fetchBalanceMoney !== null) {
      expect(typeof fetchBalanceMoney).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(50);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    try {
      await bankAccount.synchronizeBalance();
    } catch(error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
      expect((error as Error).message).toBe('Synchronization failed');
    }
  });
});
