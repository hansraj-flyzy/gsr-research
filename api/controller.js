const fs = require('fs');
const { folderId } = require('../src/urls');

exports.saveRowToFile = async (req, res) => {
    try {

        let fileName = req.body.fileName;
        let sensorVal = req.body.sensorVal;
        let timeStamp = req.body.timeStamp;
        console.log('saveRowToFile called.', req.body);
        fs.appendFileSync('recordings/'+fileName, `${timeStamp},${sensorVal}\r\n`)
        res.send({ success: true })
    } catch (error) {
        res.send({ success: false, error: error.message })
        console.error(error);
    }
}