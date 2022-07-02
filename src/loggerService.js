const { generateRandomNumber } = require("./random")

exports.getReading = (sec) => {
    let a = sec + '  ' + generateRandomNumber(256);
    return a;
}