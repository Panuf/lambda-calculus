import { C, I, K, KI, KI_C, K_C, M } from "./calculus";

describe('I (identity) tests', () => {
    test('Should return 1 for 1', () => {
        const value = 1;
        const actual = I(value);
        expect(actual).toBe(value)
    });

    test('Should return I for I', () => {
        const value = I;
        const actual = I(value);
        expect(actual).toBe(value)
    });
})

describe('M (self-application) tests', () => {
    test('Should return I for I', () => {
        const value = I;
        const actual = M(I);
        expect(actual).toBe(value);
    })

    test('Should throw stack size excedeed for M', () => {
        const mSelfApplication = () => M(M);
        expect(mSelfApplication).toThrowError("Maximum call stack size exceeded");
    })
})

describe('K (first) tests', () => {
    const data = [
        [1, 2],
        [1, 'a'],
        [1, undefined],
        [1, I]
    ]

    test.each(data)('Should return first for pair %i %s', (first: any, second: any) => {
        const actual = K(first)(second);
        expect(actual).toBe(first);
    })
})

describe('KI (second) tests', () => {
    const data = [
        [2, 1],
        ['a', 1],
        [undefined, 1],
        [I, 1]
    ]

    test.each(data)('Should return second for pair %i %s', (first: any, second: any) => {
        const actual = KI(first)(second);
        expect(actual).toBe(second);
    })
})

describe('C (flip) tests', () => {
    test('Should return y for K, x and y', () => {
        const actual = C(K)(1)(2);
        expect(actual).toBe(2);
    })

    test('Should return x for KI, x and y', () => {
        const actual = C(KI)(1)(2);
        expect(actual).toBe(1);
    })

    test('KI_C described as C K behave like regular KI', ()=> {
        const actual = KI_C(1)(2);
        expect(actual).toBe(2);
        expect(actual).toBe(KI(1)(2))
    })

    test('K_C described as C KI behave like regular K', ()=> {
        const actual = K_C(1)(2);
        expect(actual).toBe(1);
        expect(actual).toBe(K(1)(2))
    })
})