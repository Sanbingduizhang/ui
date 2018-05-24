//页面加载时候相关代码
$(function(){
    //跳转到页面，获取相册中所有图片
    var photoid = Number(window.location.href.split('?')[1].split('=')[1]);
    //调用请求
    ajaxX(photoid);

    //点击单个图片跳出弹出层
    $("#photolist").on('click','#imgdetail',function(){
        var imgid = $(this).attr('imgid');
        $("#showPhoto").val('');
    });
    $("#closeBtn").click(function(){
        $("#showPhoto").val('');
    });

    //上传图片相关代码
    var flag = 1;
    $("#mark").on('click','#imgshow',function(){
        if(flag ==1){
            var texthtml = "<img src='"+imgRUL+"'/>";
            $("#markbig").show();
            $("#markbig").html(texthtml);
            flag = 0;
        } else {
            $("#markbig").hide();
            $("#markbig").html('');
            flag = 1;
        }
        
    });

    //上传接口数据
    $("#btn").click(function(){
        // var photoid = $("#imgdetail").attr('imgid');
        var file = new FormData($("#fileupload")[0]);
        var ph = $("#photo").val();

        if(ph == ''){
            $.DialogByZ.Alert({Title: "", Content: "请选择上传的图片",FunL:"确定"});
            return false;
        }
        //上传图片发送接口
        $.ajax({
            type:"POST",
            url:"http://www.heijiang.top/admin/photo/uploadImg/"+photoid,
            data:file,
            // dataType:"json",
            // cache: false,    
            processData: false,    
            contentType: false,
            success:function(data){
                //如果成功，则重新刷新一下页面
                if(1 == data.code){
                    $.DialogByZ.Alert({Title: "", Content: "添加成功",FunL:confirmL});
                    function confirmL(){
                        $.DialogByZ.Close();
                        $("#photo").val('');
                        $("#mark").html('');
                        $("#markbig").html('');
                        //调用请求
                        ajaxX(photoid);
                    
                    }
                    
                        
                } else {
                    alert('添加失败');
                }
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
    });

    ////////////////////////////---------图片选择部分（）start-----------------//////////////////////////
    //图片hover时显示input复选框。用来删除相册
    $("#photolist").on('mouseenter','#imgdetail',function(){
        $(this).prev().css("display","block");
        // $("#check").css("display","block");
    });
    //如果被选中则显示input复选框，否则就隐藏
    $("#photolist").on('mouseleave','li',function(){
        var isChecked = $(this).find('input[type="checkbox"]').is(':checked');
        isChecked ? $(this).children("#check").show() : $(this).children("#check").hide();
        
    });
    //复选框点击事件
    $("#photolist").on('click','#check',function(){
        $(this).prop("checked",$(this).is(':checked'));
        
        var lis = $("#photolist").find('li');
        var postArr = new Array();
        var imgid = '';
        var i = 0;
        //获取被选中的图片
        lis.each(function(index,elem){
           if($(this).find('input[type="checkbox"]').is(':checked')) {
                imgid = $(this).children('img').attr('imgid');
                postArr[i] = imgid;
                i++;        
            }
        });
        if(lis.length == postArr.length) {
            $(".quanXuan").prop("checked",true);
        } else {
            $(".quanXuan").prop("checked",false);
        }
    });
    //全选按钮
    $("#btnXuan").click(function(){
        var ischecked = $(".quanXuan").is(':checked');
        var lis = $("#photolist").find('li');
        if(!ischecked){
            // $(".quanXuan").prop("checked",false);
            //将所有被选中的图片置为未被选择
            lis.each(function(index,elem){
                //提前获取是否被选中
                var isChecked = $(this).find('input[type="checkbox"]').is(':checked');
                if(isChecked) {
                    $(this).find('input[type="checkbox"]').prop("checked",false);
                    //这里依然时之前判断是否被选中，因此要重新判断
                    isChecked ? $(this).children("#check").hide() : $(this).children("#check").show();
                }
            });
        } else {
            // $(".quanXuan").prop("checked",true);
            //将所有未被选中的图片置为被选择
            lis.each(function(index,elem){
                //提前判断是否被选中
                var isChecked = $(this).find('input[type="checkbox"]').is(':checked');
                if(!isChecked) {
                    $(this).find('input[type="checkbox"]').prop("checked",true);
                    //重新判断
                    !isChecked ? $(this).children("#check").show() : $(this).children("#check").hide();
                }
            });
        }
    });
    //删除图片
    $("#btndel").click(function(){
        // 获取数据
        var photoid = $("#photolist").attr('photoid');
        var cate = $("#photolist").attr('plcate');
        var lis = $("#photolist").find('li');
        var imgIdArr = new Array();
        var imgid = '';
        var i = 0;
        //获取被选中的图片
        lis.each(function(index,elem){
           if($(this).find('input[type="checkbox"]').is(':checked')) {
                    imgid = $(this).children('img').attr('imgid');
                    imgIdArr[i] = imgid;
                    i++;
            }
        });
        // console.log(imgIdArr);return;
        if (0 > imgIdArr.length || 0 == imgIdArr.length) {
            $.DialogByZ.Alert({Title: "提示", Content: "请选择要删除的图片",BtnL:"确定"});
            return;
        }
        $.DialogByZ.Confirm({Title: "", Content: "确定删除吗",FunL:confirmL,FunR:Immediate});
        // 删除图片
        function confirmL() {
            $.DialogByZ.Close();
            $.ajax({
                type:"POST",
                url:"http://www.heijiang.top/admin/photo/delPDetail",
                dataType:"json",
                data:{
                    cate:cate,
                    photoid:photoid,
                    imgIdArr:imgIdArr,
                },
                success:function(data){
                    if(1 == data.code) {
                        ajaxX(photoid);
                        $(".quanXuan").prop("checked",false);
                    }
                },
                error:function (jqXHR){
                    console.log(jqXHR);
                }
            });
        }
        
        
    });

    ///////////////////////////---------end---------////////////////

    //////////////////////////-----------start---单个图片的信息--//////////////////////
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
        var imgDetail= imgTurnA(img_path,imgid,cate);
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
    //发表评论
    $("#btnCom").click(function(){
        var content = $("#comcon").val();
        if(0 == content.trim().length){
            $.DialogByZ.Alert({Title: "提示", Content: "请输入评论内容",BtnL:"确定"});
            return;
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