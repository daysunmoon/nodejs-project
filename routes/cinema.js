const express = require('express');
const async = require('async');
const router = express.Router();
const CinemaModel = require('../models/cinema');
router.post('/add',function(req,res){
    var cinema = new CinemaModel({
        cinemaName:req.body.cinemaName,
        cinemaAddress:req.body.cinemaAddress,
        LowerPrice:req.body.LowerPrice,
        mile:req.body.mile
    });
    cinema.save(function(err){
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
    async.parallel([
        function(cb){
            CinemaModel.find().count().then(function(num){
                cb(null,num);
            }).catch(function(err){
                cb(err);
            })
        },
        function(cb){
            CinemaModel.find().skip(pageNum*pageSize-pageSize).limit(pageSize).then(function(data){
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
module.exports = router;