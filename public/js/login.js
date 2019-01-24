(function () {
    var User = function () {
        this.btnLock = false;
        this.dom = {
            loginBtn: $('#loginBtn'),
            userNameInput: $('input[type = text]'),
            passwordInput: $('input[type = password]')
        }
    }
    User.prototype.bindDom = function () {
        var _this = this;
        this.dom.loginBtn.click(function () {
            if (!_this.btnLock) {
                _this.btnLock = true;
                _this.Login();
            }
        })
    }

    //登录login方法
    User.prototype.Login = function () {
        var _this = this;
        $.post('/user/login', {
            userName: this.dom.userNameInput.val(),
            password: this.passwordInput.val()
        }, function (res) {
            if (res.code === 0) {
                layer.msg('登录成功');
                setTimeout(function () {
                    location.href = '/';
                }, 1000)

            }else{
                layer.msg('res.msg')
            }
            _this.btnLock = false;
        })
    }
    var user = new User();
    user.bindDom();
})()