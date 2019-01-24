const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

//注册
router.post('/register',function(req,res){
    const user = new UserModel(req.body);
    user.save().then(function(){
        res.json({
            code:0,
            msg:'注册成功'
        })
    }).catch(function(error){
        res.json({
            code:-1,
            msg:error.message
        })
    })
})


//登录
router.post('/login',function(req,res){
    const userName = req.body.userName;
    const password =req.body.password;
    UserModel.findOne({
        userName,
        password
    }).then(function(data){
        console.log(data);
        if(!data){
            res.json({
                code:-1,
                msg:'用户名或密码错误'
            })
        }else{
            res.cookie('nickName',data.nickName,{
                maxAge:1000 * 60 * 10
            })
            if(data.isAdmin){
               res.cookie('admin',1,{
                maxAge:1000 * 60 * 10
               }) 
            }
            res.json({
                code:0,
                msg:'登录成功',
                data:{
                    id:data._id,
                    nickName:data.nickName,
                    isAdmin:data.isAdmin
                }
            })
        }
    }).catch(function(error){
        res.json({
            code:-1,
            msg:error.message
        })
    })
})
module.exports = router;