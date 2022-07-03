const { generateRandomNumber } = require("./random")

exports.getReading = () => {
    let a = generateRandomNumber(256);
    return a;
}