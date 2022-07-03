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

const uploadFileToGoogleDrive = async (file, auth) => {
    const fileMetadata = {
      name: file.originalname,
      parents: [folderId], // Change it according to your desired parent folder id
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };
    const driveService = google.drive({ version: "v3", auth });
    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    return response;
  };

  const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
      console.log("file deleted");
    });
  };