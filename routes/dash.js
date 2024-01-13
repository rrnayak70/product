var express= require('express')
var router= express.Router()
var pool=require("./pool")



router.get('/login',function (req,res) {
    res.render('loginpage')
});


router.get('/dash',function (req,res) {
    res.render('dash-board')
});

module.exports=router