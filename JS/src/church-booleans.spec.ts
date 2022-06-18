import { M } from "./calculus";
import { AND, BOOLEAN_EQUALITY, BOOLEAN_EQUALITY_SIMPLIFIED, DE_MORGAN_LAWS_1, DE_MORGAN_LAWS_2, FALSE, IF_THEN_ELSE, NOT, NOT_C, OR, TRUE } from "./church-booleans";

const assertTrue = f => expect(f(1)(2)).toBe(1);
const assertFalse = f => expect(f(1)(2)).toBe(2);

describe('NOT tests', () => {
    test('Should return FALSE for TRUE', () => {
        const actual = NOT(TRUE);
        assertFalse(actual);
    });

    test('Should return TRUE for FALSE', () => {
        const actual = NOT(FALSE);
        assertTrue(actual);
    });

    test('NOT_C described as usage of cardinal should return TRUE for FALSE', () => {
        const actual = NOT_C(TRUE);
        assertFalse(actual);
    })

    test('NOT_C described as usage of cardinal should return FALSE for TRUE', () => {
        const actual = NOT_C(FALSE);
        assertTrue(actual);
    })
})

describe('AND tests', () => {
    const data = [
        [TRUE, TRUE, assertTrue],
        [TRUE, FALSE, assertFalse],
        [FALSE, TRUE, assertFalse],
        [FALSE, FALSE, assertFalse]];

    test.each(data)('Should return TRUE only for TRUE TRUE', (first: any, second: any, assertion: any) => {
        const actual = AND(first)(second);
        assertion(actual);
    })
})

describe('OR tests', () => {
    const data = [
        [TRUE, TRUE, assertTrue],
        [TRUE, FALSE, assertTrue],
        [FALSE, TRUE, assertTrue],
        [FALSE, FALSE, assertFalse]];

    test.each(data)('Should return TRUE for either value being', (first: any, second: any, assertion: any) => {
        const actual = OR(first)(second);
        assertion(actual);
    })

    test.each(data)('M (self application) constructs equivalent of OR when passed TRUE/FALSE', (first: any, second: any, assertion: any) => {
        const actual = M(first)(second);
        assertion(actual);
    })
})

describe('BOOLEAN_EQUALITY tests', () => {
    const data = [
        [TRUE, TRUE, assertTrue],
        [TRUE, FALSE, assertFalse],
        [FALSE, TRUE, assertFalse],
        [FALSE, FALSE, assertTrue]];

    test.each(data)('Should return TRUE when both booleans are equal', (first: any, second: any, assertion: any) => {
        const actual = BOOLEAN_EQUALITY(first)(second);
        assertion(actual);
    })

    test.each(data)('BOOLEAN_EQUALITY_SIMPLIFIED should behave as BOOLEAN_EQUALITY', (first: any, second: any, assertion: any) => {
        const actual = BOOLEAN_EQUALITY_SIMPLIFIED(first)(second);
        assertion(actual);
    })
})

describe('DE_MORGANS_LAWS tests', () => {
    const data = [
        [TRUE, TRUE],
        [TRUE, FALSE],
        [FALSE, TRUE],
        [FALSE, FALSE]];

    test.each(data)('DE_MORGAN_LAWS_1 should hold TRUE for each combination', (first: any, second: any) => {
        const actual = DE_MORGAN_LAWS_1(first)(second);
        assertTrue(actual);
    })

    test.each(data)('DE_MORGAN_LAWS_2 should hold TRUE for each combination', (first: any, second: any) => {
        const actual = DE_MORGAN_LAWS_2(first)(second);
        assertTrue(actual);
    })
})

describe('IF_THEN_ELSE tests', () => {

    const add = (a, b) => a + b;
    const substract = (a, b) => a - b;

    const data = [
        [TRUE, 6],
        [FALSE, 2]
    ]

    test.each(data)('Should select appropriate branch based on condition', (condition: any, expected: any) => {
        const branch = IF_THEN_ELSE(condition)(add)(substract);
        const actual = branch(4, 2);
        expect(actual).toBe(expected);
    })
})