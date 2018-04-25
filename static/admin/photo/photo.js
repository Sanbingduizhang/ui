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
$(function(){
    //跳转到页面请求一次相册
    $.ajax({
        type:"GET",
        url:"http://www.heijiang.top/admin/photo/index",
        dataType:"json",
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
            },
            url:"http://www.heijiang.top/admin/photo/pCreate",
            // url:"http://laravelgo.com/admin/photo/pCreate",
            dataType:"json",
            success:function(data){
                //如果成功，则重新刷新一下页面
                if(1 == data.code){
                    alert('相册添加成功');
                    $('#createPhoto').hide();
                    $.ajax({
                        type:"GET",
                        url:"http://www.heijiang.top/admin/photo/index",
                        // url:"http://laravelgo.com/admin/photo/index",
                        dataType:"json",
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
        var imgid = $(this).attr('imgid');
        window.location.href='pdetail.html?photoid='+imgid;
    });
    
});