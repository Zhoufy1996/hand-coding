import throttle from '../../src/throttle/throttle';

const FIXED_SYSTEM_TIME = '2020-01-12T00:00:00Z';

describe('throttle', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
    });
    it('it properly throttle function', () => {
        const func = jest.fn();
        const throttleFunction = throttle<typeof func>(func, 100);

        throttleFunction();
        expect(func.mock.calls.length).toBe(1);

        jest.advanceTimersByTime(50);
        throttleFunction();
        expect(func.mock.calls.length).toBe(1);

        jest.advanceTimersByTime(50);
        throttleFunction();
        expect(func.mock.calls.length).toBe(1);

        jest.advanceTimersByTime(1);
        throttleFunction();
        expect(func.mock.calls.length).toBe(2);

        // execute func when stop
        jest.advanceTimersByTime(499);
        expect(func.mock.calls.length).toBe(2);

        // execute func when stop
        jest.advanceTimersByTime(1);
        expect(func.mock.calls.length).toBe(3);
    });

    it('it properly throttle function waitMax set 0 ', () => {
        const func = jest.fn();
        const throttleFunction = throttle<typeof func>(func, 100, { waitMax: 0 });

        throttleFunction();
        expect(func.mock.calls.length).toBe(1);

        jest.advanceTimersByTime(50);
        throttleFunction();
        expect(func.mock.calls.length).toBe(1);

        jest.advanceTimersByTime(50);
        throttleFunction();
        expect(func.mock.calls.length).toBe(1);

        jest.advanceTimersByTime(1);
        throttleFunction();
        expect(func.mock.calls.length).toBe(2);

        // execute func when stop
        jest.advanceTimersByTime(499);
        expect(func.mock.calls.length).toBe(2);

        // execute func when stop
        jest.advanceTimersByTime(1);
        expect(func.mock.calls.length).toBe(2);
    });
});
