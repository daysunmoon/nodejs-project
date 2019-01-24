//渲染页面的路由
const express = require('express');
const router = express.Router();
//首页
router.get('/',function(req,res){
    res.render('index');
})
//banner页面渲染
router.get('/banner.html',function(req,res){
    res.render('banner');
})
//影片管理界面渲染
router.get('/film.html',function(req,res){
    res.render('film');
})
//影院界面渲染
router.get('/cinema.html',function(req,res){
    res.render('cinema');
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