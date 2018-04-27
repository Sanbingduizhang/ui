//图片上传预览函数方法
function getImgURL(node) { 
    var imgURL = "";      
    try{     
        var file = null;  
        if(node.files && node.files[0] ){  
            file = node.files[0];   
        }else if(node.files && node.files.item(0)) {                                  
            file = node.files.item(0);     
        }     
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
        try{  
            //Firefox7.0   
            imgURL =  file.getAsDataURL();    
            //alert("//Firefox7.0"+imgRUL);                           
        }catch(e){  
            //Firefox8.0以上                                
            imgRUL = window.URL.createObjectURL(file);  
            //alert("//Firefox8.0以上"+imgRUL);  
        }  
     }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常                   
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10  
        if (node.files && node.files[0]) {                            
            var reader = new FileReader();   
            reader.onload = function (e) {                                        
                imgURL = e.target.result;    
            };  
            reader.readAsDataURL(node.files[0]);   
        }    
     }  
    
    //imgurl = imgURL;  
    creatImg(imgRUL);  
    return imgURL;  
}  
         
function creatImg(imgRUL){   //根据指定URL创建一个Img对象  
    var textHtml = "<img src='"+imgRUL+"'  width='150px' height='150px' id='imgshow' style='cursor: pointer;'/>";  
    $("#mark").html(textHtml);  
}

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
});