const { default: axios } = require('axios');
const wifi = require('node-wifi');
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

exports.connectToWifi = async (req, res) => {
    try {
        const { ssid, password } = req.body;
        // Initialize wifi module
        // Absolutely necessary even to set interface to null
        wifi.init({
            iface: null // network interface, choose a random wifi interface if set to null
        });

        // Connect to a network
        wifi.connect({ ssid: 'ssid', password: 'password' }, () => {
            console.log('Connected');
            // List the current wifi connections
            wifi.getCurrentConnections((error, currentConnections) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(currentConnections);
                    res.send({ success: true, connections: currentConnections });
                }
                // on windows, the callback is called even if the connection failed due to netsh limitations
                // if your software may work on windows, you should use `wifi.getCurrentConnections` to check if the connection succeeded
            })
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
}