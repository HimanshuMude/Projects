const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/asyncWrapper");
const Task = require("../models/taskModel");

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async (req, res,next) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res,next) => {

    const task = await Task.findById(req.params.id);
    if (!task) { 
        return next(createCustomError(`No task found with id ${req.params.id}`,404))
    }
    res.status(200).json({ task });

})
const updateTask = asyncWrapper(async (req, res,next) => {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(createCustomError(`No task found with id ${req.params.id}`, 404))
    }
    res.status(200).json({ task });


    // try {
    //     const {id:taskID}=req.params;
    //     const task= await Task.findOneAndUpdate({_id:taskID},req.body,{
    //         new:true,
    //         runValidators:true
    //     })

    //     if(!task) return res.status(404).json({msg:`No task with id ${taskID}`});

    //     res.status(200).json({task});
    //     // console.log("Hello");
    // } catch (error) {

    //     res.status(500).json({msg:error});

    // }
})
const deleteTask = asyncWrapper(async (req, res,next) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return next(createCustomError(`No task found with id ${req.params.id}`, 404))
    }
    res.status(200).json({ task });

})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }