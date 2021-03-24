import debounce from './debounce';

const FIXED_SYSTEM_TIME = '2020-01-12T00:00:00Z';

describe('debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
    });
    it('it properly debounces function', () => {
        const func = jest.fn();
        const debouncedFunction = debounce<typeof func>(func, 100);

        debouncedFunction();
        expect(func).not.toBeCalled();

        jest.advanceTimersByTime(50);
        expect(func).not.toBeCalled();

        debouncedFunction();
        jest.advanceTimersByTime(100);
        expect(func).toBeCalled();
        expect(func.mock.calls.length).toBe(1);
    });

    it('it properly debounces function can cancel', () => {
        const func = jest.fn();
        const debouncedFunction = debounce<typeof func>(func, 100);

        debouncedFunction();
        expect(func).not.toBeCalled();

        jest.advanceTimersByTime(50);
        expect(func).not.toBeCalled();

        debouncedFunction.cancel();

        jest.advanceTimersByTime(100);
        expect(func).not.toBeCalled();
    });

    it('it properly debounces function with isImmediate set true', () => {
        const func = jest.fn();
        const debouncedFunction = debounce<typeof func>(func, 100, { isImmediate: true });

        debouncedFunction();
        expect(func.mock.calls.length).toBe(1);

        debouncedFunction();
        jest.advanceTimersByTime(50);
        expect(func.mock.calls.length).toBe(1);

        debouncedFunction();
        jest.advanceTimersByTime(100);
        expect(func.mock.calls.length).toBe(2);
    });
});
