const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
// task modal
const Task = require("../models/task.model");


// @route   GET api/task
router.get("/", auth, async (req, res) =>
{
    const { email } = req.user;
    console.log('requseted email', email);

    try {
        let tasks = await Task.find({ createdBy: email });
        if (!tasks) {
            return res
                .status(404)
                .json({
                    resultShort: 'failure',
                    resultLong: 'Oops, No data found!'
                });
        }
        res.status(200).json({
            resultShort: "success",
            resultLong: "Tasks fetched successfully....",
            tasks
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("OOPS, Something went Wrong");
    }
}
);

// @route   POST api/task/create
router.post("/create", auth,
    [
        check("name", "Name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty()
    ],
    async (req, res) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log('req body', req.body);
        // console.log('req user', req.user);
        const { name, description, filePath } = req.body;
        const { email } = req.user;


        try {
            task = new Task({
                name,
                description,
                filePath,
                createdBy: email
            });
            await task.save();
            return res.status(200).json({
                resultShort: 'success',
                resultLong: 'The task has been created successfully'
            })

        } catch (err) {
            console.error(err.message);
            res.status(500).send("OOPS, Something went Wrong");
        }
    }
);

// @roure  GET api/task/:_id
router.get("/:_id", auth, async (req, res) =>
{
    const { _id } = req.params;
    console.log('req.params', req.params)
    try {
        let task = await Task.findOne({ _id });
        if (!task) {
            return res.status(404).json({
                resultShort: 'failure',
                resultLong: 'Oops, No data found'
            });
        }
        res.status(200).json({
            resultShort: 'succsess',
            resultLong: 'Task fetched successfully',
            task
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("OOPS, Something went Wrong");
    }
})


// @route  PUT api/task/:_id
router.put("/update/:_id", auth, async (req, res) =>
{
    const { _id } = req.params;
    const { name, description } = req.body;
    console.log('postobj', req.body)
    try {
        await Task.findOneAndUpdate({ _id }, { $set: { name, description } }, { upsert: true }, (err, newTask) =>
        {
            if (err) {
                return res.status(400).json({
                    resultShort: 'failure',
                    resultLong: 'Oops, No data found',
                    err
                })
            }
            newTask.save();
            return res.status(200).json({
                resultShort: 'succsess',
                resultLong: 'Task updated successfully'
            })
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("OOPS, Something went Wrong");
    }
})

// @route  PUT api/task/:_id
router.delete('/:_id', auth, async (req, res) =>
{
    const { _id } = req.params;
    try {
        await Task.findByIdAndDelete(_id).then(() => res.status(200).json({
            resultShort: 'success',
            resultLong: 'The task has been deleted'
        })).catch(err => res.status(400).json({
            resultShort: 'failure',
            resultLong: 'Oops, something went wrong while deleting task',
            err
        }))
    } catch (err) {
        console.error(err.message);
        res.status(500).send("OOPS, Something went Wrong");
    }
});
module.exports = router;
