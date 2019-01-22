$(function(){
    var pageNum = 1;
    var pageSize = 5;
    search(pageNum,pageSize);
    $('#addFilm').click(function(){
        $.post('/film/add',{
            filmName:$('#filmName').val(),
            filmImg:$('#filmImg').val(),
            describe:$('#describe').val(),
            star:$('#star').val()
        },function(res){
            if(res.code === 0){
                layer.msg('添加成功');
            }else{
                console.log(err.message);
                layer.msg('网络异常，请稍后重试');
            }
        })
        //手动关闭弹窗
        $('#myModal').modal('hide');
        //手动清空输入框
        $('#filmName').val('');
        $('#filmImg').val('');
        $('#describe').val('');
        $('#star').val('');
    })
    function search(pageNum,pageSize){
        $.get('/film/search',{
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
                            <td>${item._id}</td>
                            <td>${item.filmName}</td>
                            <td><img src="${item.filmImg}" alt=""></td>
                                        
                            <td>${item.describe} </td>
                            <td>${item.star}</td>
                            <td>
                                <a href="">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="">修改</a>
                            </td>
                        </tr>
                        `
                    )
                }
            }else{
                console.log(result.message);
                layer.msg('网络异常，请稍后重试');
            }
        })
    }
    
})