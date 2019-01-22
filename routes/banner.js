const express = require('express');
const async = require('async');
const router = express.Router();
const BannerModel = require('../models/banner');
router.post('/add',function(req,res){
    var banner = new BannerModel({
        name:req.body.bannerName,
        imgUrl:req.body.bannerUrl
    });
    banner.save(function(err){
        if(err){
            res.json({
                code:-1,
                msg:err.message
            })
        }else{
            res.json({
                code:0,
                msg:'添加成功'
            })
        }
    })

})

router.get('/search',function(req,res){
    const pageNum = parseInt(req.query.pageNum) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    //采用并行无关联
    async.parallel([
        function(cb){
            BannerModel.find().count().then(function(num){
                cb(null,num);
            }).catch(function(err){
                cb(err);
            })
        },
        function(cb){
            BannerModel.find().skip(pageNum*pageSize-pageSize).limit(pageSize)
            .then(function(data){
                cb(null,data);
            }).catch(function(err){
                cb(err);
            })
        }
    ],function(err,result){
        if(err){
            res.json({
                code:-1,
                msg:err.message
            })
        }else{
            res.json({
                code:0,
                msg:'ok',
                data:result[1],
                totalSize:result[0]
            })
        }
    })
})
//删除操作
// router.get('/delete',function(req,res){
    
// })
module.exports = router;