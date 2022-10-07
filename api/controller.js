const { default: axios } = require('axios');
const fs = require('fs');
exports.checkForUpdates = async (req, res) => {
    try {
        let resp = await axios.get('https://us-central1-tusc-91a8b.cloudfunctions.net/gsr/getProdVersion')
        let data = resp.data()
        // console.log('version', data);
        if (data.success) {
            // const currentVersion = fs.readFileSync('~/gsrProdVersion',
            // {encoding:'utf8', flag:'r'});
            return {
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