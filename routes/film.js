const express = require('express');
const router = express.Router();
const async = require('async');
const FilmModel = require('../models/film');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: 'F:/tmp'
})
router.post('/add', upload.single('filmImg'), function (req, res) {
    const newFileName = new Date().getTime() + "_" + req.file.originalname;
    const newFilePath = path.resolve(__dirname, '../public/uploads/films/', newFileName);
    try {
        const data = fs.readFileSync(req.file.path);
        fs.writeFileSync(newFilePath, data);
        fs.unlinkSync(req.file.path);
        var film = new FilmModel({
            filmName: req.body.filmName,
            filmImg: req.body.filmImg,
            describe: req.body.describe,
            star: req.body.star
        });
        film.save().then(function () {
            res.json({
                code: -1,
                msg: err.message
            })
        }).catch(function (err) {
            res.json({
                code: 0,
                msg: '添加成功'
            })
        })

    } catch (error) {
        res.json({
            code: -1,
            msg: error.message
        })
    }






    // var film = new FilmModel({
    //     filmName:req.body.filmName,
    //     filmImg:req.body.filmImg,
    //     describe:req.body.describe,
    //     star:req.body.star
    // });
    // film.save(function(err){
    //     if(err){
    //         res.json({
    //             code:-1,
    //             msg:err.message
    //         })
    //     }else{
    //         res.json({
    //             code:0,
    //             msg:'添加成功'
    //         })    
    //     }
    // })
})
router.get('/search', function (req, res) {
    const pageNum = parseInt(req.query.pageNum);
    const pageSize = parseInt(req.query.pageSize);
    async.parallel([
        function (cb) {
            FilmModel.find().count().then(function (num) {
                cb(null, num);
            }).catch(function (err) {
                cb(err);
            })
        },
        function (cb) {
            FilmModel.find().skip(pageNum * pageSize - pageSize).limit(pageSize).then(function (data) {
                cb(null, data);
            }).catch(function (err) {
                cb(err);
            })
        }
    ], function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: err.message
            })
        } else {
            res.json({
                code: 0,
                msg: 'ok',
                data: result[1],
                totalPage:Math.ceil(result[0] / pageSize) 
            })
        }
    })
})
module.exports = router;