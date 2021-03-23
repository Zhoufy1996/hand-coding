interface Procedure {
    (...args: any[]): any;
}

interface Options {
    isImmediate?: boolean;
}

// 延时delay执行fn，delay内重新执行，则取消前一个，重新计时
const debounce = <T extends Procedure>(fn: T, delay: number, option: Options = {}) => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    let immediateExecute: boolean = option.isImmediate || false;

    const debounceFn = (...args: Parameters<T>) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        if (immediateExecute) {
            immediateExecute = false;
            fn(...args);
        } else {
            timerId = setTimeout(() => {
                timerId = undefined;
                fn(...args);
            }, delay);
        }
    };

    const cancel = () => {
        if (timerId) {
            clearTimeout(timerId);
        }
    };

    debounceFn.cancel = cancel;

    return debounceFn;
};

export default debounce;
