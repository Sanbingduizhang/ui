//相册渲染方法
function photos(data){
    var datas = data.data.data;
    var str = '';
    for(var i = 0;i < datas.length;i++){
        var ppath = datas[i].photo;
        var path;
        if(ppath.length != 0){
            path = ppath.img_path;
        }else{
            path = 'add.png';
        }
        str += '<li>'+
                    '<input type="checkbox" name="photoCheck" id="check">'+
                    '<img id = "imgdetail" src="'+path+'" alt="图片消失了" title="'+datas[i].photo.img_name+'" photoid="'+datas[i].id+'">'+
                    '<div class="imgdesc">'+
                        '<span class="time">'+datas[i].pname+'</span>'+
                        '<span class="count1">共'+datas[i].photo_count+'张</span>'+
                    '</div>'+  
                '</li>';
    }
    return str;
}

function ajaxP(){
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/admin/photo/index",
        dataType:"json",
        data:{
            token:tokenGet(),
        },
        success:function(data){
            //获取页码相关内容
            var yema = data.data;
            //调用相关方法
            var str1 = photos(data);
            $("#photolist").html(str1);
            //分页
            $('.M-box1').pagination({
                totalData: yema.total,
                showData: yema.per_page,
                current:yema.current_page,
                coping: true,
                callback:function(api){
                    $.ajax({
                        type:"GET",
                        url:"http://www.heijiang.top/admin/photo/index?page="+api.getCurrent(),
                        dataType:"json",
                        success:function(data){
                            //调用相关方法
                            var strs = photos(data)
                            $("#photolist").html(strs);
                        },
                        error:function (jqXHR){
                            console.log(jqXHR);
                        }
        
                    });
                },
            });
        },
        error:function (jqXHR){
            console.log(jqXHR);
        }
    });
}
