const express = require('express');
const async = require('async');

const BannerModel = require('../models/banner');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest:'F:/tmp'
})
const router = express.Router();
//新增banner
router.post('/add', upload.single('bannerImg'), function (req, res) {
    console.log(req.file)
    const newFileName = new Date().getTime() + '_' + req.file.originalname;
    const newFilePath = path.resolve(__dirname, '../public/uploads/banners/',newFileName);
    // 2.把文件移动到public中
    try {
        const data = fs.readFileSync(req.file.path);
        fs.writeFileSync(newFilePath, data);
        fs.unlinkSync(req.file.path);
        //文件名字 + banner 图名字写入到数据库
        var banner = new BannerModel({
            name: req.body.bannerName,
            imgUrl: 'http://localhost:3000/uploads/banners/' + newFileName
        });
        banner.save().then(function(){
            res.json({
                code:0,
                msg:'ok'
            })
        }).catch(function(err){
            res.json({
                code:-1,
                msg:err.message
            })
        })
    } catch (error) {
        res.json({
            code:-1,
            msg:error.message
        })
    }
})
// router.post('/add',function(req,res){
//     var banner = new BannerModel({
//         name:req.body.bannerName,
//         imgUrl:req.body.bannerUrl
//     });
//     banner.save(function(err){
//         if(err){
//             res.json({
//                 code:-1,
//                 msg:err.message
//             })
//         }else{
//             res.json({
//                 code:0,
//                 msg:'添加成功'
//             })
//         }
//     })

// })
//从数据库查询数据渲染到页面
router.get('/search', function (req, res) {
    const pageNum = parseInt(req.query.pageNum) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    //采用并行无关联
    async.parallel([
        function (cb) {
            BannerModel.find().count().then(function (num) {
                cb(null, num);
            }).catch(function (err) {
                cb(err);
            })
        },
        function (cb) {
            BannerModel.find().skip(pageNum * pageSize - pageSize).limit(pageSize)
                .then(function (data) {
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
                totalPage: Math.ceil(result[0] / pageSize)
                // totalSize:result[0]
            })
        }
    })
});
//删除操作
router.post('/delete', function (req, res) {
    const id = req.body.id;
    BannerModel.findOneAndDelete({
        _id: id
    }).then(function (data) {
        if (data) {
            res.json({
                code: 0,
                msg: 'ok'
            })
        } else {
            res.json({
                code: -1,
                msg: '未找到相关记录'
            })
        }
        console.log('data');
    }).catch(function (error) {
        res.json({
            code: -1,
            msg: error.message
        })
    })
})

module.exports = router;