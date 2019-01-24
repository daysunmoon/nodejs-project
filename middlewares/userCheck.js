//这个文件，是用来做用户验证的一个中间件函数
module.exports = function(req,res,next){
    //得到nickName
    const nickName = req.cookies.nickName;
    if(nickName){
        next();
    }else{
        res.redirect('login.html');
    }
}