const express = require("express");
const { postFormData, getAllFormData } = require("../controllers/FormData");
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Server is running successfully")
})
router.post("/postResponses", postFormData);
router.get("/getResponse", getAllFormData);

module.exports = router;