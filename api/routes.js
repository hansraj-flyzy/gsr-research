const express = require("express");
const router = express.Router();
const path = require("path");

const { saveRowToFile } = require('./controller');
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

router.post("/addRow", saveRowToFile);
router.use(express.static("build"));
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


module.exports = router;