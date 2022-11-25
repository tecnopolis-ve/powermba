const generateNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
};

const generateRandPassword = (length = 14) => {
    const chars = 'abcdefghijklmnoprqstuvwxyz0123456789@#$%&_?-';
    const charList = chars.split('');
    const shuffledList = charList.sort((a, b) => 0.5 - Math.random());
    return shuffledList.slice(0, length - 1).join('');
}

module.exports = {
    generateNumber,
    generateRandPassword,
};