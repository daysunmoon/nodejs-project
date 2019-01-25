//渲染页面的路由
const express = require('express');
const router = express.Router();
const userCheck = require('../middlewares/userCheck');
//首页
router.get('/',userCheck,function(req,res){
    res.render('index',{
        nickName:req.cookies.nickName,
        isAdmin:parseInt(req.cookies.isAdmin)
    });
})
//banner页面渲染
router.get('/banner.html',userCheck,function(req,res){
    res.render('banner',{
        nickName:req.cookies.nickName,
        isAdmin:parseInt(req.cookies.isAdmin)
    });
})
//影片管理界面渲染
router.get('/film.html',userCheck,function(req,res){
    res.render('film',{
        nickName:req.cookies.nickName,
        isAdmin:parseInt(req.cookies.isAdmin)
    });
})
//影院界面渲染
router.get('/cinema.html',userCheck,function(req,res){
    res.render('cinema',{
        nickName:req.cookies.nickName,
        isAdmin:parseInt(req.cookies.isAdmin)
    });
})
//注册
router.get('/register.html',function(req,res){
    res.render('register');
})
//登录
router.get('/login.html',function(req,res){
    res.render('login');
})
module.exports = router;