const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_-+=<>?";
    const numberChars = "0123456789";

    const getRandomChar = (charset) => {
        const randomIndex = Math.floor(Math.random() * charset.length);
        return charset[randomIndex];
    };

    const password = [
        getRandomChar(lowercaseChars),
        getRandomChar(uppercaseChars),
        getRandomChar(specialChars),
        getRandomChar(numberChars),
    ];

    const remainingChars = lowercaseChars + uppercaseChars + specialChars + numberChars;
    for (let i = password.length; i < 20; i++) {
        password.push(getRandomChar(remainingChars));
    }

    password.sort(() => Math.random() - 0.5);

    return password.join('');
}

module.exports = generatePassword;
