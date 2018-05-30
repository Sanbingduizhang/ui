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
    //全局变量
    var photoidDel = '';
    var imgidDel = '';
    //点击单个图片跳出弹出层
    $("#photolist").on('click','#imgdetail',function(){
        //跳出弹出层
        imgid = $(this).attr('imgid');
        var img_path = $(this).attr('img_path');
        var cate = $(this).attr('cate');
        var photoid = $(this).attr('photoid');

        //给全局变量赋值
        photoidDel = photoid;
        imgidDel = imgid;

        $("#showPhoto").show();
        //调用图片转换方法
        var imgDetail= imgTurn(img_path,imgid,cate);
        //进行图片渲染
        $(".basePhot").html(imgDetail);
/////////////--------------------点击单个图片之后的评论----------////////////////
        //评论显示
        $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/home/comment/imgComment?photoid="+photoid+"&imgid="+imgid+"&cate="+cate,
            dataType:"json",
            success:function(data){
                //加载评论方法，渲染评论页面
                var str = imgCom(data);
                $(".showCom").html(str);
                
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
    });
    //点击单个图片渲染整个html页面，进行全局渲染
    // var oneFlag = 1;
    // $(".basePhot").on('click','img',function(){
        
    //     var imgid = $(this).attr('imgid');
        
    //     //嗲用完成图片炸死你hi办法
    //     var imgDetail= imgYuan(quanjuData,imgid);
    //     $("#closeBtn").hide();
    //     $(".likePhoto").hide();
    //     $(".baseCom").hide();
    //     $(".bgimg").show();
    //     $(".bgimg").html(imgDetail);
    //     oneFlag = -1;
        
    // });
    // 完整图片图层展示关闭
    // $(".bgcolor").click(function(){
    //     $("#closeBtn").show();
    //     $(".likePhoto").show();
    //     $(".baseCom").show();
    //     $(".bgimg").hide();
    //     oneFlag = 1;
    // });
    // $(".bgimg").click(function(){
    //     $("#closeBtn").show();
    //     $(".likePhoto").show();
    //     $(".baseCom").show();
    //     $(".bgimg").hide();
    //     oneFlag = 1;
    // });
    // $(".basedown").click(function(){
    //     $("#closeBtn").show();
    //     $(".likePhoto").show();
    //     $(".baseCom").show();
    //     $(".bgimg").hide();
    //     oneFlag = 1;
    // });
    //关闭图层
    $("#closeBtn").click(function(){
        $("#showPhoto").hide();
    });
    /////////////////////////////// 评论相关/////////////////////////
    //发表评论
    $("#btnCom").click(function(){
        var content = $("#comcon").val();
        if(!tokenGet()){
            alert("请先登陆");
            return false;
        }
        if(0 == content.trim().length){
            alert("请输入评论内容");
            return false;
        }
        var imgid = $(".basePhot>img").attr('imgid');
        var cate = $(".basePhot>img").attr('cate');
        //发送请求
        $.ajax({
            type:"POST",
            data:{
                id:imgid,
                content:content,
                cate:cate,
                token:tokenGet(),
            },
            url:"http://www.heijiang.top/home/comment/comAdd",
            dataType:"json",
            success:function(data){
                $("#comcon").val('');
                $.DialogByZ.Alert({Title: "", Content: "添加成功",BtnL:"确定"});
                //重新渲染页面
                $.ajax({
                    type:"GET",
                    url:"http://www.heijiang.top/home/comment/imgComment?photoid="+photoid+"&imgid="+imgid+"&cate="+cate,
                    dataType:"json",
                    success:function(data){
                        //加载评论方法，渲染评论页面
                        var str = imgCom(data);
                        $(".showCom").html(str);
                        
                    },
                    error:function (jqXHR){
                        console.log(jqXHR);
                    }
                }); 
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
    });
    //显示更多评论
    $(".showCom").on('click','.showMore',function(){
        //评论显示(显示所有评论)
        var imgid = $(".basePhot>img").attr('imgid');
        var cate = $(".basePhot>img").attr('cate');
        $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/home/comment/imgComment?more=true&photoid="+photoid+"&imgid="+imgid+"&cate="+cate,
            dataType:"json",
            success:function(data){
                //加载评论方法，渲染评论页面
                var str = imgComMore(data);
                $(".showCom").html(str);
                
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
    });
    //评论的删除
    $(".showCom").on('click','.delCom',function(){
        var id = $(this).parent().parent().attr('comment_id');
        var cate = $(this).parent().parent().attr('cate');
        $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/home/comment/comDel/id/"+id+"/cate/"+cate,
            dataType:"json",
            success:function(data){
                //删除成功，则显示删除成功
                if(1 == data.code){
                    $.DialogByZ.Alert({Title: "提示", Content: "删除成功",BtnL:"确定"});
                    //评论显示
                    $.ajax({
                        type:"GET",
                        url:"http://www.heijiang.top/home/comment/imgComment?photoid="+photoidDel+"&imgid="+imgidDel+"&cate="+cate,
                        dataType:"json",
                        success:function(data){
                            //加载评论方法，渲染评论页面
                            var str = imgCom(data);
                            $(".showCom").html(str);
                            
                        },
                        error:function (jqXHR){
                            console.log(jqXHR);
                        }
                    }); 
                }
            },
            error:function (jqXHR){
                alert(jqXHR.message);
                console.log(jqXHR);
            }
        });
    });
    //评论的点赞
    $(".showCom").on('click','.likeGo',function(){
        var id = $(this).parent().parent().attr('comment_id');
        var cate = $(this).parent().parent().attr('cate');
    });


});