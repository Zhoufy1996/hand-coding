import arrayUnique from './arrayUnique';

describe('array unique', () => {
    it('unique any type', () => {
        expect(arrayUnique([1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}])).toEqual([
            1,
            '1',
            17,
            true,
            false,
            'true',
            'a',
            {},
            {},
        ]);
    });

    it('not test', () => {
        expect(arrayUnique([1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}])).not.toEqual([
            1,
            '1',
            17,
            true,
            false,
            'true',
            'a',
            {},
        ]);
    });
});
