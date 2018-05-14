$(function(){
    //ajax发送请求后，设置全局存储数据
    var quanjuData = '';
    //跳转到页面，获取相册中所有图片
    var photoid = Number(window.location.href.split('?')[1].split('=')[1]);
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/home/photo/show/"+photoid,
        dataType:"json",
        success:function(data){
            //将获取到的数据存储在全局中
            quanjuData = data;
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
                //总条数
                totalData: yema.total,
                //每页显示条数
                showData: yema.per_page,
                //当前页码
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
        //跳出弹出层
        var imgid = $(this).attr('imgid');
        console.log(imgid);
        $("#showPhoto").show();
        //调用图片转换方法
        var imgDetail= imgTurn(quanjuData,imgid);
        //进行图片渲染
        $(".basePhot").html(imgDetail);
    });
    //点击单个图片渲染整个html页面，进行全局渲染
    // var oneFlag = 1;
    // $(".basePhot").on('click','img',function(){
    //     console.log(111);
    //     var imgid = $(this).attr('imgid');
    //     console.log(imgid);
    //     //嗲用完成图片炸死你hi办法
    //     var imgDetail= imgYuan(quanjuData,imgid);
    //     $(".bgcolor2").show();
    //     $(".bgimg").show();
    //     $(".bgimg").html(imgDetail);
    //     oneFlag = -1;
        
    // });
    //完整图片图层展示关闭
    // $(".bgcolor2").click(function(){
    //     console.log(111222);
    //     $(this).hide();
    //     $(".bgimg").hide();
    //     oneFlag = 1;
    // })
    //关闭图层
    $("#closeBtn").click(function(){
        $("#showPhoto").hide();
    });
    /////////////////////////////// 评论相关/////////////////////////
    //评论显示
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/home/photo/show/"+photoid,
        dataType:"json",
        success:function(data){
            
        },
        error:function (jqXHR){
            console.log(jqXHR);
        }
    });


});