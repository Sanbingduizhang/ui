//图片渲染方法
function pdetail(data){
    var datas = data.data.data;
    var str = '';
    for(var i = 0;i < datas.length;i++){
        var path;
        if(datas.length != 0){
            path = datas[i].img_path;
        }else{
            path = 'add.png';
        }
        str += '<li>'+
                    '<img id = "imgdetail" src="'+path+'" alt="图片消失了" title="'+datas[i].img_name+'" imgid="'+datas[i].id+'">'+
                '</li>';
    }
    return str;
}
//请求页面图片接口
function ajaxX(photoid){
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/admin/photo/show/"+photoid,
        dataType:"json",
        success:function(data){
            var str = pdetail(data);
            $("#photolist").html(str);
            //获取页码相关内容
            var yema = data.data;
            //分页
            $('.M-box1').pagination({
                totalData: yema.total,
                showData: yema.per_page,
                current:yema.current_page,
                coping: true,
                callback:function(api){
                    $.ajax({
                        type:"GET",
                        url:"http://www.heijiang.top/admin/photo/show/"+photoid+"?page="+api.getCurrent(),
                        dataType:"json",
                        success:function(data){
                            //调用相关方法
                            var strs = pdetail(data);
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