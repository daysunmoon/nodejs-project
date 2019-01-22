const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

//引入路由文件
const indexRouter = require('./routes/index');
const bannerRouter = require('./routes/banner');
const filmRouter = require('./routes/film');
const cinemaRouter = require('./routes/cinema');
//使用中间件
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//静态托管
app.use(express.static('public'));

//设置express的模板存放路径和使用什么模板引擎
app.set('views',path.resolve(__dirname,'./views'));
app.set('view engine','ejs');
//路由中间件的使用
app.use('/', indexRouter);
app.use('/banner', bannerRouter);
app.use('/film', filmRouter);
app.use('/cinema',cinemaRouter);
app.listen(3000);