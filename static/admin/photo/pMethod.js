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

//图片渲染方法  所有图片列表
function pdetail(data){
    var datas = data.data.res.data;
    var str = '';
    for(var i = 0;i < datas.length;i++){
        var path;
        if(datas.length != 0){
            path = datas[i].img_thumb;
            origin_path = datas[i].img_path;
        }else{
            path = 'add.png';
            origin_path = 'add.png';
        }
        str += '<li>'+
                    '<input type="checkbox" name="photoCheck" id="check">'+
                    '<img id = "imgdetail" src="'+path+'" alt="图片消失了" title="'+datas[i].img_name+'" imgid="'+datas[i].id+'" img_path="'+ origin_path+'" cate="'+data.data.cate+'" photoid="'+datas[i].cate_id+'">'+
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
            var plCate = data.data.cate;
            var plpid = data.data.photoid;
            $("#photolist").attr('plCate',plCate);
            $("#photolist").attr('photoid',plpid);
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