exports.saveRowToFile = async (req, res) => {
    try {
        let { sensorVal, timeStamp, fileName } = req.body;
        console.log('saveRowToFile called.', req.body);
        res.send({ success: true })
    } catch (error) {
        res.send({ success: false, error: error.message })
        console.error(error);
    }
}