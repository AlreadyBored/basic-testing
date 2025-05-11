// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from ".";
const initialBalance = 0;

describe("BankAccount", () => {
  test("should create account with initial balance", () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test("should throw InsufficientFundsError error when withdrawing more than balance", () => {
    const depositBalance = 70;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(depositBalance)).toThrow(
      InsufficientFundsError,
    );
  });

  test("should throw error when transferring more than balance", () => {
    const account1 = getBankAccount(70);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(100, account2)).toThrow(
      InsufficientFundsError,
    );
  });
  test("should throw error when transferring to the same account", () => {
    const account1 = getBankAccount(70);
    expect(() => account1.transfer(100, account1)).toThrow(TransferFailedError);
  });

  test("should deposit money", () => {
    const account = getBankAccount(70);
    account.deposit(50);
    expect(account.getBalance()).toBe(120);
  });

  test("should withdraw money", () => {
    const account = getBankAccount(100);
    account.withdraw(70);
    expect(account.getBalance()).toBe(30);
  });

  test("should transfer money", () => {
    const account1 = getBankAccount(70);
    const account2 = getBankAccount(100);
    account1.transfer(70, account2);
    expect(account2.getBalance()).toBe(170);
  });
  test("fetchBalance should return number in case if request did not failed", async () => {
    const account = getBankAccount(100);
    const fetchBalanceMock = jest
      .spyOn(account, "fetchBalance")
      .mockResolvedValue(1000);
    const fetchedBalance: number | null = await account.fetchBalance();
    expect(fetchedBalance).not.toBeNull();
    expect(typeof fetchedBalance).toBe("number");
    expect(fetchedBalance).toBe(1000);
    fetchBalanceMock.mockRestore();
  });

  test("should set new balance if fetchBalance returned number", async () => {
    const account = getBankAccount(100);

    const mockFetchBalance = jest.spyOn(account, "fetchBalance");
    const successfulValue = 300;
    mockFetchBalance.mockResolvedValue(successfulValue);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(successfulValue);
  });

  test("should throw SynchronizationFailedError if fetchBalance returned null", async () => {
    const account = getBankAccount(100);
    const mockFetchBalance = jest.spyOn(account, "fetchBalance");
    mockFetchBalance.mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
