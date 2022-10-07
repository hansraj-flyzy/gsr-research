const e = require("express");
const express = require("express");
const router = express.Router();
let lastSensorVal=0;
let sensorLastOk = new Date(2000, 1, 1)
const fs = require('fs');
const { SerialPort } = require('serialport')
// Create a port
const port = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 9600,
}, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
})

port.on('data', data => {
    console.log('Received from arduino: $', data.toString()+'$');
    if(data.toString().trim()=='ok'){
        console.log('sensor ok');
        sensorLastOk = new Date();
        // console.log('overwrite sensorLastOk', sensorLastOk);
    } else{
        lastSensorVal = data.toString();
        // console.log('overwrite lastSensorVal', lastSensorVal);
    }

})
router.post("/addRow", (req, res, next) => {
    // console.log('sensorReading Before', lastSensorVal);
    port.write('reading', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        // console.log('message reading written')
    })
    setTimeout(() => {
        let fileName = req.body.fileName;
        let timeStamp = req.body.timeStamp;
        // console.log('saveRowToFile called.', req.body);
        fs.appendFileSync('recordings/' + fileName, `${timeStamp},${lastSensorVal}\r\n`)
        const readLastLines = require('read-last-lines');
        let last50Lines;
        readLastLines.read('recordings/' + fileName, 50)
            .then((lines) => {
                last50Lines = lines;
                // console.log('lines', lines);
                // console.log('last50Lines', last50Lines);
                res.send({ success: true, last50Lines: last50Lines });
            })
    }, 100)
});

const { checkForUpdates } = require('./controller');


router.use(express.static("build"));
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
router.get("/testSensor", (req, res) => {
    port.write('test', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message test written')
    })
    setTimeout(()=>{
        // console.log('sensorLastOk',sensorLastOk);
        res.send({sensorLastOk: sensorLastOk});
    }, 200)
});
router.post('/checkForUpdates', checkForUpdates)


module.exports = router;