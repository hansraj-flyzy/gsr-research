const express = require("express");
const router = express.Router();

const { saveRowToFile, checkForUpdates } = require('./controller');

router.post("/addRow", saveRowToFile);
router.use(express.static("build"));
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
router.post('/checkForUpdates', checkForUpdates)


module.exports = router;