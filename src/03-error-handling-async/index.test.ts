// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
  MyAwesomeError,
} from "./index";

describe("resolveValue", () => {
  test("should resolve provided value", async () => {
    const resolveValueMsg = "Hello";
    const result = await resolveValue(resolveValueMsg);
    expect(result).toBe(resolveValueMsg);
  });
});

describe("throwError", () => {
  test("should throw error with provided message", () => {
    const resolveValueMsg = "Hello";
    expect(() => throwError(resolveValueMsg)).toThrow(resolveValueMsg);
  });

  test("should throw error with default message if message is not provided", () => {
    expect(() => throwError()).toThrow("Oops!");
  });
});

describe("throwCustomError", () => {
  test("should throw custom error", () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe("rejectCustomError", () => {
  test("should reject custom error", async () => {
    expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
