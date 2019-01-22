const express = require('express');
const router = express.Router();
const async = require('async');
const FilmModel = require('../models/film');
router.post('/add',function(req,res){
    var film = new FilmModel({
        filmName:req.body.filmName,
        filmImg:req.body.filmImg,
        describe:req.body.describe,
        star:req.body.star
    });
    film.save(function(err){
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
    const pageNum = parseInt(req.query.pageNum);
    const pageSize = parseInt(req.query.pageSize);
    async.parallel([
        function(cb){
            FilmModel.find().count().then(function(num){
                cb(null,num);
            }).catch(function(err){
                cb(err);
            })
        },
        function(cb){
            FilmModel.find().skip(pageNum*pageSize-pageSize).limit(pageSize).then(function(data){
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
                pageSize:result[0]
            })
        }
    })
})
module.exports = router;