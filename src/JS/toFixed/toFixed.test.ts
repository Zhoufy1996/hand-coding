import toFixed from './toFixed';

describe('toFixed', () => {
    it('it 0.15.toFixed(1) !== 0.2', () => {
        expect((0.15).toFixed(1)).not.toBe(0.2);
    });

    it('it toFixed(0.15, 1) === 0.2', () => {
        expect(toFixed(0.15, 1)).toBe(0.2);
    });

    it('it 0.15.toFixed(1) !== 0.2', () => {
        expect((-0.15).toFixed(1)).not.toBe(-0.2);
    });

    it('it toFixed(-0.15, 1) === -0.2', () => {
        expect(toFixed(-0.15, 1)).toBe(-0.2);
    });
});
