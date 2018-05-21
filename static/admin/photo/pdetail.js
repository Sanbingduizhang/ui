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
            alert('请上传图片');
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
                    alert('图片添加成功');
                    
                    $("#photo").val('');
                    $("#mark").html('');
                    $("#markbig").html('');
                    //调用请求
                    ajaxX(photoid);

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
        if(ischecked){
            $(".quanXuan").prop("checked",false);
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
            $(".quanXuan").prop("checked",true);
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
            alert("请选择要删除的图片!");
            return;
        }
        if(!confirm("确定删除吗")) {
            return;
        }
        // 删除图片
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
                }
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
        
    });

    ///////////////////////////---------end---------////////////////
});