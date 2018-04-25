$(function(){
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
    $("#btn").click(function(){
        $.ajax({
            type:"POST",
            url:"https://phonecheck.market.alicloudapi.com/phoneAuthentication",
            data:{
                
            },
            dataType:"json",
            success:function(data){
                console.log(data);
            },
            error:function (jqXHR){
                console.log(jqXHR);
            }
        });
    });
});