const express = require("express");
const router = express.Router();

const { saveRowToFile } = require('./controller');

router.post("/addRow", saveRowToFile);
router.use(express.static("build"));
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


module.exports = router;