$(function(){
    //跳转到页面请求一次相册
    ajaxP();

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

    //点击创建新相册，跳出弹框
    $("#createnew").click(function(){
        $("#createPhoto").show();
    });
    //创建新相册
    $("#btnPhoto").click(function(){
        var status = $('input:radio[name="status"]:checked').val();
        var share = $('input:radio[name="share"]:checked').val();
        var pname = $('#pname').val();
        if('' == pname){
            alert('相册名称不为空');
            return false;
        }
        if($.trim(pname).length < 3 || $.trim(pname).length > 10){
            alert('相册名称大于3个且少于10个');
            return false;
        }
        $.ajax({
            type:"POST",
            data:{
                status:status,
                share:share,
                pname:pname,
                token:tokenGet(),
            },
            url:"http://www.heijiang.top/admin/photo/pCreate",
            // url:"http://laravelgo.com/admin/photo/pCreate",
            dataType:"json",
            success:function(data){
                //如果成功，则重新刷新一下页面
                if(1 == data.code){
                    $.DialogByZ.Confirm({Title: "", Content: "添加成功",FunL:confirmL,FunR:Immediate});
                    function confirmL(){
                        $.DialogByZ.Close();
                        $('#createPhoto').hide();
                        $.ajax({
                            type:"GET",
                            url:"http://www.heijiang.top/admin/photo/index",
                            // url:"http://laravelgo.com/admin/photo/index",
                            dataType:"json",
                            data:{
                                token:tokenGet(),
                            },
                            success:function(data){
                                //调用函数，请求成功刷新页面
                                //调用相关方法
                                var str = photos(data);
                                $("#photolist").html(str);
                            },
                            error:function (jqXHR){
                                console.log(jqXHR);
                            }
                        });
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
    //点击关闭按钮，关闭创建相册图层
    $("#closeb").click(function(){
        $("#createPhoto").hide();
    });
    //点击图片跳转到详情页面
    $('#photolist').on('click','#imgdetail',function(){
        var photoid = $(this).attr('photoid');
        window.location.href='pdetail.html?photoid='+photoid;
    });
    
    //删除相册
    $("#delPhoto").click(function(){
        // 获取数据
        var lis = $("#photolist").find('li');
        var pIdArr = new Array();
        var photoid = '';
        var i = 0;
        //获取被选中的图片
        lis.each(function(index,elem){
           if($(this).find('input[type="checkbox"]').is(':checked')) {
            photoid = $(this).children('img').attr('photoid');
            pIdArr[i] = photoid;
                    i++;
            }
        });
        // console.log(imgIdArr);return;
        if (0 > pIdArr.length || 0 == pIdArr.length) {
            // alert("请选择要删除的相册");
            $.DialogByZ.Alert({Title: "提示", Content: "请选择要删除的相册",BtnL:"确定"});
            return;
        }
        $.DialogByZ.Confirm({Title: "删除提示", Content: "是否确定删除<br>将删除相册和对应的所有图片",FunL:confirmL,FunR:Immediate});
        function confirmL(){
            $.DialogByZ.Close();
            $.ajax({
                type:"POST",
                url:"http://www.heijiang.top/admin/photo/pdel",
                dataType:"json",
                data:{
                    pIdArr:pIdArr,
                    pLength:pIdArr.length,
                    token:tokenGet(),
                },
                success:function(data){
                    if(1 == data.code) {
                        ajaxP();
                    }
                },
                error:function (jqXHR){
                    console.log(jqXHR);
                }
            });
        }
    });
    
});