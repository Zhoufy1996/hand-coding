import Scheduler from './scheduler';

const FIXED_SYSTEM_TIME = '2020-01-12T00:00:00Z';

describe('scheduler', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
    });
    it('start task', async () => {
        const result: string[] = [];
        const timeout = (time: number) => {
            return new Promise((resolve) => {
                setTimeout(resolve, time);
            });
        };

        const scheduler = new Scheduler();

        const addTask = (time: number, order: string) => {
            scheduler.add(() =>
                timeout(time).then(() => {
                    result.push(order);
                })
            );
        };

        /**
         * 其实1、2两个任务开始执行
         * 500ms时，2任务执行完毕，输出2，任务3开始执行
         * 800ms时，3任务执行完毕，输出3，任务4开始执行
         * 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
         * 1200ms时，4任务执行完毕，输出4
         */
        addTask(1000, '1');
        addTask(500, '2');
        addTask(300, '3');
        addTask(400, '4');

        for (let i = 0; i < 22; i += 1) {
            jest.advanceTimersByTime(100);
            // eslint-disable-next-line no-await-in-loop
            await Promise.resolve(); // allow any pending jobs in the PromiseJobs queue to run
        }
        expect(result).toEqual(['2', '3', '1', '4']);
        expect(result).not.toEqual(['2', '3', '4', '1']);
    });
});
