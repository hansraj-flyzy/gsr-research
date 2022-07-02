const express = require("express");
const router = express.Router();

const {saveRowToFile} = require('./controller');
router.post("/addRow", saveRowToFile);
router.get("/", function (req, res) {
    res.send('server running on port 8080')
 });


module.exports = router;