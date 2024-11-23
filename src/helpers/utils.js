// remove empty fields from filter (GSM='' for example)
const removeEmptyStrings = obj => {
    const newObj = {};
    Object.keys(obj).forEach(prop => {
        if (obj[prop] !== '') {
            newObj[prop] = obj[prop];
        }
    });
    return newObj;
};

export default {
    removeEmptyStrings,
};
