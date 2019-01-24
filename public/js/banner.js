(function () {
    //定义这个文件操作的构造函数
    var Banner = function () {
        this.pageNum = 1; //当前页数
        this.pageSize = 4; //每页显示的条数
        this.totalPage = 0; //总得页数
        this.bannerList = [];
        //需要用到的dom对象 性能优化dom缓存
        this.dom = {
            table: $('#banner-table tbody'), //table的 tbody
            page: $('#page'), //分页的url
            nameInput: $('#inputEmail3'), //名字的输入框
            urlInput: $('#inputPassword3'), //url的输入框
            addModal: $('#myModal'), //模态框
            addBanner: $('#addBanner'), //确认添加按钮
            updateName: $('#updateName'), //修改名称
            updateImg: $('#updateImg'),
            updateBanner: $('#updateBanner'),
            updateModal:$('#updateModal')
        }
    }

    //新增方法
    Banner.prototype.add = function () {
        var _this = this;
        // 1.实例化一个FormData对象
        var formData = new FormData();
        //2.给formData对象加属性
        formData.append('bannerName', this.dom.nameInput.val());
        formData.append('bannerImg', this.dom.urlInput[0].files[0]);
        $.ajax({
            url: '/banner/add',
            method: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function () {
                layer.msg('添加成功');
                _this.search();
            },
            error: function () {
                console.log(error.message);
                layer.msg('网络异常，请稍后重试');
            },
            complete: function () {
                // 手动调用关闭的方法
                _this.dom.addModal.modal('hide');
                //手动清空输入框的内容
                _this.dom.nameInput.val('');
                _this.dom.urlInput.val('');
            }
        })
        // $.post('/banner/add', {
        //     bannerName: this.dom.nameInput.val(),
        //     bannerUrl: this.dom.urlInput.val()
        // }, function (res) {
        //     if (res.code === 0) {
        //         layer.msg('添加成功');
        //         _this.search();
        //     } else {
        //         console.log(err.message);
        //         alert('网络异常，请稍后操作');
        //     }
        //     // 手动调用关闭的方法
        //     _this.dom.addModal.modal('hide');
        //     //手动清空输入框的内容
        //     _this.dom.nameInput.val('');
        //     _this.dom.urlInput.val('');
        // })
    }
    //查询方法
    Banner.prototype.search = function () {
        var _this = this;
        $.get('/banner/search', {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }, function (result) {
            if (result.code === 0) {
                // layer.msg('查询成功');
                //将result中的data写入实例bannerList中
                _this.bannerList = result.data;
                //将result中的totalPage写入到实例的totalPage中
                _this.totalPage = result.totalPage;
                //调用渲染table
                _this.renderTable();
                //调用渲染 分页
                _this.renderPage();
            } else {
                console.log(result.message);
                alert('网络异常，请稍后重试');
            }
        })

    }
    //渲染table
    Banner.prototype.renderTable = function () {
        this.dom.table.html('');
        for (var i = 0; i < this.bannerList.length; i++) {
            var item = this.bannerList[i];
            this.dom.table.append(
                `
                    <tr>
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td><img src="${item.imgUrl}" alt=""></td>
                        <td>
                            <a class="delete" data-id ="${item._id}" href="javascript:;" >删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" class="update" data-toggle="modal" data-target="#updateModal" data-id ="${item._id}">修改</a>
                        </td>
                     </tr>
                 `
            )
        }
    }
    //渲染分页
    Banner.prototype.renderPage = function () {
        var _this = this;
        var prevClassName = this.pageNum === 1 ? 'disabled' : '';
        var nextClassName = this.pageNum === this.totalPage ? 'disabled' : '';
        //清空
        this.dom.page.html('');
        //添加上一页
        this.dom.page.append(
            `
            <li class ="${prevClassName}" data-num="${this.pageNum-1}">
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            `
        )
        //根据this.totalPage循环渲染多少个li
        for (var i = 1; i <= this.totalPage; i++) {
            var className = this.pageNum === i ? 'active' : '';
            this.dom.page.append(
                `
                <li class="${className}" data-num="${i}"><a href="#">${i}</a></li>
                `
            )
        }
        //添加下一页
        this.dom.page.append(
            `
            <li class="${nextClassName}" data-num="${this.pageNum + 1}">
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
           `
        )
    }
    //修改方法
    Banner.prototype.update = function (id) {
        var _this = this;
         id = id;
        // 1.实例化一个FormData对象
        var formData = new FormData();
        //2.给formData对象加属性
        formData.append('id',id);
        formData.append('updateName', this.dom.updateName.val());
        formData.append('updateImg', this.dom.updateImg[0].files[0]);
        $.ajax({
            url: '/banner/update',
            method: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function () {
                layer.msg('修改成功');
                _this.search();
            },
            error: function (error) {
                console.log(error.message);
                layer.msg('网络异常，请稍后重试');
            },
            complete: function () {
                // 手动调用关闭的方法
                _this.dom.updateModal.modal('hide');
                //手动清空输入框的内容
                _this.dom.updateName.val('');
                _this.dom.updateImg.val('');
            }
        })
    }
    //将所有dom操作放在这里
    Banner.prototype.bindDom = function () {
        var _this = this;
        //点击确定添加按钮调用add
        this.dom.addBanner.click(function () {
            _this.add();
        })
        //分页按钮点击事件
        this.dom.page.on('click', 'li', function () {
            //得到页码
            //attr获取属性，如果是自定义属性并且用data开头，我们可以更简单的使用data
            var num = parseInt($(this).data('num'));
            //判断是否点击相同页，或者<1或者>总页数
            if (_this.pageNum === num || num < 1 || num > _this.totalPage) {
                return;
            }
            //将num设给this.pageNum
            _this.pageNum = num;
            //再次调用一次search
            _this.search();
        })
        //删除按钮事件
        this.dom.table.on('click', '.delete', function () {
            //得到id，根据id删除
            var id = $(this).data('id');
            //二次确认框
            layer.confirm('确认删除吗', function () {
                console.log('确认');
                _this.search();
                $.post('/banner/delete', {
                    id: id
                }, function (result) {
                    if (result.code == 0) {
                        layer.msg('删除成功');

                    } else {
                        console.log(err.message);
                        layer.msg('网络异常，请稍后重试');
                    }
                })
            }, function () {
                console.log('取消');
            })
        })
        //修改按钮事件
        this.dom.table.on('click', '.update', function () {
            //得到id，根据id修改
            var _id = $(this).data('id');
            _this.dom.updateBanner.click(function () {
                _this.update(_id);
            })
        })
    }
    //最后
    $(function () {
        var banner = new Banner();
        banner.bindDom();
        banner.search(); //渲染第一页
    })
})();













// $(function(){
//     var pageNum = 1;
//     var pageSize = 5;
//     search(pageNum,pageSize);
//     $('#addBanner').click(function(){
//         $.post('/banner/add',{
//             bannerName:$('#inputEmail3').val(),
//             bannerUrl :$('#inputPassword3').val()
//         },function(res){
//             if(res.code === 0){
//                 layer.msg('添加成功');
//             }else{
//                 console.log(err.message);
//                 alert('网络异常，请稍后操作');
//             }
//         })
//          // 手动调用关闭的方法
//          $('#myModal').modal('hide');
//          //手动清空输入框的内容
//          $('#inputEmail3').val('');
//          $('#inputPassword3').val('');
//     })
// })

// //数据库中查询数据渲染到页面
// function search(pageNum,pageSize){
//     $.get('/banner/search',{
//         pageNum:pageNum,
//         pageSize:pageSize
//     },function(result){
//         if(result.code === 0){
//             layer.msg('查询成功');
//             for(var i = 0;i < result.data.length;i++){
//                 var item = result.data[i];

//                 $('#banner-table tbody').append(
//                      `
//                     <tr>
//                         <td class="id">${item._id}</td>
//                         <td>${item.name}</td>
//                         <td><img src="${item.imgUrl}" alt=""></td>
//                         <td>
//                             <a class="delete" href="javascript:;" >删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
//                             <a href="javascript:;" class="update">修改</a>
//                         </td>
//                      </tr>
//                      `
//                 );

//             }
//         }else{
//             console.log(result.message);
//             alert('网络异常，请稍后重试');
//         }
//     })
// }