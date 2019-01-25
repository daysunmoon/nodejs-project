(function () {
    var User = function () {
        this.btnLock = false;
        this.dom = {
            loginBtn: $('#loginBtn'),
            userNameInput: $('.userName'),
            passwordInput: $('.password'),
            nickNameInput: $('.nickName'),
            isAdminInput: $('.isAdmin')
        }
    }
    User.prototype.bindDom = function () {
        var _this = this;
        this.dom.loginBtn.click(function () {
            if (!_this.btnLock) {
                // _this.btnLock = true;
                _this.Register();
            }
        })
    }

    //注册register方法
    User.prototype.Register = function () {
        var _this = this;
        $.post('/user/register', {
            userName: this.dom.userNameInput.val(),
            password: this.dom.passwordInput.val(),
            nickName: this.dom.nickNameInput.val(),
            isAdmin:this.dom.isAdminInput.val()
        }, function (res) {
            if (res.code === 0) {
                layer.msg('注册成功');
                setTimeout(function () {
                    location.href = '/login.html';
                }, 1000)

            }else{
                layer.msg(res.msg)
            }
            _this.btnLock = false;
        })
    }
    var user = new User();
    user.bindDom();
})()