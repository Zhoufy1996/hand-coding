// 可限制并行数的调度器
class Scheduler {
    private queue: Function[] = [];

    private maxCount: number;

    private runCount: number = 0;

    constructor(maxCount?: number) {
        this.maxCount = maxCount || 2;
    }

    add(fn: Function): void {
        this.queue.unshift(fn);
        this.execute();
    }

    execute() {
        if (this.runCount < this.maxCount && this.queue.length > 0) {
            const fn = async () => {
                this.runCount += 1;
                try {
                    await (this.queue.pop() as Function)();
                } finally {
                    this.runCount -= 1;
                    this.execute();
                }
            };
            fn();
        }
    }
}

export default Scheduler;
