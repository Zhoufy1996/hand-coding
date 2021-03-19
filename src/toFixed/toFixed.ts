// bug: 0.15.toFixed(1) === 0.2 false
const toFixed = (number: number = 0, decimal: number = 2): number => {
    return Number((Math.abs(number) + 1e-14).toFixed(decimal)) * (number > 0 ? 1 : -1);
};

export default toFixed;
