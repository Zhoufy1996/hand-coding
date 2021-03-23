interface Procedure {
    (...args: any[]): any;
}

interface Options {
    waitMax?: number;
}

// 立即执行fn，如果delay内已经执行过了，则不执行
const throttle = <T extends Procedure>(fn: T, delay: number, { waitMax = 500 }: Options = {}) => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    let lastExecuteTime: number | undefined;

    const setTimeoutWaitMaxExecute = (...args: Parameters<T>) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
        }, waitMax);
    };

    const executeFn = (...args: Parameters<T>) => {
        lastExecuteTime = new Date().getTime();
        fn(args);
        if (waitMax > 0) {
            setTimeoutWaitMaxExecute(...args);
        }
    };

    const throttleFn = (...args: Parameters<T>) => {
        if (lastExecuteTime) {
            if (new Date().getTime() - lastExecuteTime > delay) {
                executeFn(...args);
            }
        } else {
            executeFn(...args);
        }
    };

    return throttleFn;
};

export default throttle;
