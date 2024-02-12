import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
    test('should add two numbers', () => {
        const input = {
            a: 7,
            b: 8,
            action: Action.Add,
        };
        const result = simpleCalculator(input);

        expect(result).toBe(15);
    });

    test('should subtract two numbers', () => {
        const input = {
            a: 100,
            b: 20,
            action: Action.Subtract,
        };
        const result = simpleCalculator(input);

        expect(result).toBe(80);
    });

    test('should multiply two numbers', () => {
        const input = {
            a: 7,
            b: 8,
            action: Action.Multiply,
        };
        const result = simpleCalculator(input);

        expect(result).toBe(56);
    });

    test('should divide two numbers', () => {
        const input = {
            a: 100,
            b: 0,
            action: Action.Divide,
        };
        const result = simpleCalculator(input);
        expect(result).toBe(Infinity);
    });

    test('should exponentiate two numbers', () => {
        const input = {
            a: 5,
            b: 3,
            action: Action.Exponentiate,
        };
        const result = simpleCalculator(input);

        expect(result).toBe(125);
    });

    test('should return null for invalid action', () => {
        const input = {
            a: 4,
            b: 1,
            action: 'Invalid action',
        };
        const result = simpleCalculator(input);

        expect(result).toBe(null);
    });

    test('should return null for invalid arguments', () => {
        const input = {
            a: null,
            b: undefined,
            action: Action.Exponentiate,
        };
        const result = simpleCalculator(input);

        expect(result).toBe(null);
    });
});
