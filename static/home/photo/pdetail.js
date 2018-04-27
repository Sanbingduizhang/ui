$(function(){
    //跳转到页面，获取相册中所有图片
    var photoid = Number(window.location.href.split('?')[1].split('=')[1]);
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/home/photo/show/"+photoid,
        dataType:"json",
        success:function(data){
            //渲染head头部
            var header = headM(data);
            $(".allxinxi").html(header);
            //渲染页面
            var str = pdetail(data);
            $("#photolist").html(str);
            // 生成页码
            var yema = data.data.res;
            //分页
            $('.M-box1').pagination({
                totalData: yema.total,
                showData: yema.per_page,
                current:yema.current_page,
                coping: true,
                callback:function(api){
                    $.ajax({
                        type:"GET",
                        url:"http://www.heijiang.top/home/photo/show/"+photoid+"?page="+api.getCurrent(),
                        dataType:"json",
                        success:function(data){
                            //调用相关方法
                            var strs = pdetail(data)
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

    //点击单个图片跳出弹出层
    $("#photolist").on('click','#imgdetail',function(){
        var imgid = $(this).attr('imgid');
        $("#showPhoto").show();
    });
    $("#closeBtn").click(function(){
        $("#showPhoto").hide();
    })
});