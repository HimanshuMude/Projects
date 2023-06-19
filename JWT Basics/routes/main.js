const express=require('express');
const router=express.Router();
const {login,dashBoard}=require('../controllers/main')
const authMiddleware=require("../middleware/auth");


router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware,dashBoard);

module.exports=router