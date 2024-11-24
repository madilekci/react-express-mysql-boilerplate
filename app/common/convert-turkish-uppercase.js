export default value => {
    // Normalize the string to handle Turkish-specific uppercase rules
    const map = {
        ı: 'I',
        i: 'İ',
        ö: 'Ö',
        ü: 'Ü',
        ç: 'Ç',
        ş: 'Ş',
        ğ: 'Ğ',
    };

    // Convert the string to lowercase,
    // split it into an array of characters,
    // map each character to its uppercase equivalent (Apply Turkish mapping or default)
    // then join the array back into a string
    if (typeof value === 'string') {
        return value
            .toLowerCase()
            .split('')
            .map(char => map[char] || char.toUpperCase())
            .join('');
    }
    if (typeof value === 'object') {
        Object.entries(value).forEach(([key, val]) => {
            if (typeof val === 'string') {
                value[key] = val
                    .toLowerCase()
                    .split('')
                    .map(char => map[char] || char.toUpperCase())
                    .join('');
            }
        });
        return value;
    }
    return value;
};
