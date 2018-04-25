//相册渲染方法
function photos(data){
    var datas = data.data.data;
    var str = '';
    for(var i = 0;i < datas.length;i++){
        var ppath = datas[i].photo;
        var path;
        if(ppath.length != 0){
            path = ppath.img_path;
        }else{
            path = 'add.png';
        }
        str += '<li>'+
                    '<img id = "imgdetail" src="'+path+'" alt="图片消失了" title="'+datas[i].photo.img_name+'" imgid="'+datas[i].id+'">'+
                    '<div class="imgdesc">'+
                        '<span class="time">'+datas[i].pname+'</span>'+
                        '<span class="count1">共'+datas[i].photo_count+'张</span>'+
                    '</div>'+  
                '</li>';
    }
    return str;
}