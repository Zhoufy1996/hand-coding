import add from './curry';

describe('add', () => {
    it('continue add', () => {
        expect(add(1)(2)(3)(4).getSum()).toBe(10);
    });

    it('continue add not toBe', () => {
        expect(add(1)(2)(3)(4)(5).getSum()).not.toBe(10);
    });
});
