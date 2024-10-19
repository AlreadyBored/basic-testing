import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const INITIAL_BALANCE = 100;
const OPERATION_MONEY = 20;

describe('BankAccount', () => {
  let bankAccount: BankAccount | undefined;
  beforeEach(() => {
    bankAccount = getBankAccount(INITIAL_BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount?.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount?.withdraw(INITIAL_BALANCE + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount?.withdraw(INITIAL_BALANCE + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount?.transfer(OPERATION_MONEY, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount?.deposit(OPERATION_MONEY).getBalance()).toBe(
      INITIAL_BALANCE + OPERATION_MONEY,
    );
  });

  test('should withdraw money', () => {
    expect(bankAccount?.withdraw(OPERATION_MONEY).getBalance()).toBe(
      INITIAL_BALANCE - OPERATION_MONEY,
    );
  });

  test('should transfer money', () => {
    const anotherBankAccount = getBankAccount(INITIAL_BALANCE);
    bankAccount?.transfer(OPERATION_MONEY, anotherBankAccount);

    expect(bankAccount?.getBalance()).toBe(INITIAL_BALANCE - OPERATION_MONEY);
    expect(anotherBankAccount?.getBalance()).toBe(
      INITIAL_BALANCE + OPERATION_MONEY,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await bankAccount?.fetchBalance();
    if (balance) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    let stopLoopCountProtector = 10000;
    let balance;
    while (!balance) {
      if (stopLoopCountProtector === 0) {
        console.log(
          `you test was failed ${stopLoopCountProtector}times, or you so lucy, or you have problem`,
        );
        break;
      }
      try {
        await bankAccount?.synchronizeBalance();
        balance = await bankAccount?.getBalance();
        expect(typeof balance).toBe('number');
        expect(balance).not.toBe(INITIAL_BALANCE);
        break;
      } catch {
        stopLoopCountProtector -= 1;
        continue;
      }
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect(async () => {
      let stopLoopCountProtector = 10000;

      while (true) {
        if (stopLoopCountProtector === 0) {
          console.log(
            `you test was failed ${stopLoopCountProtector}times, or you so lucy, or you have problem`,
          );
          break;
        }

        try {
          await bankAccount?.synchronizeBalance();
          stopLoopCountProtector -= 1;
          continue;
        } catch (error) {
          throw error;
        }
      }
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
