const arrayUnique = (arr: unknown[]): unknown[] => {
    return [...new Set(arr)];
};

export default arrayUnique;
