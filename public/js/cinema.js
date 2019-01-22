$(function(){
    var pageNum = 1;
    var pageSize = 5;
    search(pageNum,pageSize);
    $('#addCinema').click(function(){
        $.post('/cinema/add',{
            cinemaName:$('#cinemaName').val(),
            cinemaAddress:$('#cinemaAddress').val(),
            LowerPrice:$('#LowerPrice').val(),
            mile:$('#mile').val()
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
        //手动清除输入框
        $('#cinemaName').val('');
        $('#cinemaAddress').val('');
        $('#LowerPrice').val('');
        $('#mile').val('');
    })
    function search(pageNum,pageSize){
        $.get('/cinema/search',{
            pageNum:pageNum,
            pageSize:pageSize
        },function(result){
            if(result.code === 0){
                layer.msg('查询成功');
                console.log(result.data)
                for(var i = 0;i < result.data.length;i++){
                    var item = result.data[i];
                    $('#banner-table tbody').append(
                        `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.cinemaName}）</td>
                            <td>${item.cinemaAddress}</td>
                            <td><i>￥</i>${item.LowerPrice}起</td>
                            <td>${item.mile}</td>
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