const Submission = require("../models/Submissions");


//post all the data to db
exports.postFormData = async (req, res) => {
    try {
        //fetch data
        const object = req.body;
        if (!object) {
            return res.status(403).json({
                success: false,
                message: "No object found",
            })
        }
        await Submission.create(object);
        // console.log(data);
        return res.status(200).json({
            success: true,
            message: "Form saved successfully!",
            data: object,
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while saving form in Db"
        })
    }
}

//get all the data from database
exports.getAllFormData = async (req, res) => {
    try {
        const fetchedData = await Submission.findOne({}).sort({ createdAt: -1 });
        if (!fetchedData) {
            return res.status(400).json({
                success: false,
                message: "No submission found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Latest form data is fetched successfully",
            data: fetchedData,
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetchinn form data in Db"
        })
    }
}
