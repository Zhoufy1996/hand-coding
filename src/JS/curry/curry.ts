interface Fn {
    (num: number): Fn;
    getSum: () => number;
}

const add = (origin: number = 0) => {
    let sum = origin;

    const fn: Fn = (num: number) => {
        sum += num;
        return fn;
    };

    fn.getSum = () => {
        return sum;
    };

    return fn;
};

export default add;
