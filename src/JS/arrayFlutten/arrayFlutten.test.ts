import arrayFlutten from './arrayFlutten';

describe('array flutten', () => {
    it('[1, 2, [3, 4, [5]]] flutten to [1, 2, 3, 4, 5]', () => {
        expect(arrayFlutten([1, 2, [3, 4, [5]]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('not test', () => {
        expect(arrayFlutten([1, 2, [3, 4, [5]]])).not.toEqual([1, 2, 3, 4]);
    });
});
