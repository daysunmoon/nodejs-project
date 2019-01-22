$(function(){
    var pageNum = 1;
    var pageSize = 5;
    search(pageNum,pageSize);
    $('#addBanner').click(function(){
        $.post('/banner/add',{
            bannerName:$('#inputEmail3').val(),
            bannerUrl :$('#inputPassword3').val()
        },function(res){
            if(res.code === 0){
                layer.msg('添加成功');
            }else{
                console.log(err.message);
                alert('网络异常，请稍后操作');
            }
        })
         // 手动调用关闭的方法
         $('#myModal').modal('hide');
         //手动清空输入框的内容
         $('#inputEmail3').val('');
         $('#inputPassword3').val('');
    })
})

//数据库中查询数据渲染到页面
function search(pageNum,pageSize){
    $.get('/banner/search',{
        pageNum:pageNum,
        pageSize:pageSize
    },function(result){
        if(result.code === 0){
            layer.msg('查询成功');
            for(var i = 0;i < result.data.length;i++){
                var item = result.data[i];
                
                $('#banner-table tbody').append(
                     `
                    <tr>
                        <td class="id">${item._id}</td>
                        <td>${item.name}</td>
                        <td><img src="${item.imgUrl}" alt=""></td>
                        <td>
                            <a href="javascript:;" class="delete">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" class="update">修改</a>
                        </td>
                     </tr>
                     `
                );
               
                
            }
        }else{
            console.log(result.message);
            alert('网络异常，请稍后重试');
        }
    })
}
//分页跳转
//删除
// $('.delete').click(function(){
//     $.get('/banner/delete',{
//         _id:$('.id').val()
//     },function(res){

//     })
// })
//修改