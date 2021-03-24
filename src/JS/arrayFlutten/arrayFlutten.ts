type numberArrItem = numberArrItem[] | number;

const arrayFlutten = (arr: numberArrItem[]): number[] => {
    return arr.flat(Infinity);
};

export default arrayFlutten;
