const { default: axios } = require('axios');
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

exports.checkForUpdates=async (req, res)=>{
    try {
        let resp = await axios.get('https://us-central1-tusc-91a8b.cloudfunctions.net/gsr/getProdVersion')
        let data = resp.data()
        console.log('version', data);
        if(data.success){
            // const currentVersion = fs.readFileSync('~/gsrProdVersion',
            // {encoding:'utf8', flag:'r'});
            return{
                success: true,
                currentVersion: data.version,
                updatesAvailable: true,
                latestVersion: data.version
            }
        }
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
}