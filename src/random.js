// Create a function for reusable perpose
exports.generateRandomString = (myLength) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
  };

  // Create a function for reusable perpose
exports.generateRandomNumber = (maxValue) => {
  let rand = Math.floor(Math.random() * maxValue);
  return rand;
};