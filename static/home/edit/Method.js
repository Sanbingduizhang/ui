function cate(data){
    var cates = data.data;
    var cate_len = cates.length;
    str = '';
    for(var i = 0;i < cate_len;i++){
        if(cates[i].id == 1){
            str += '<option value="'+cates[i].id+'" selected="selected">'+cates[i].name+'</option>';
        } else {
            str += '<option value="'+cates[i].id+'">'+cates[i].name+'</option>';  
        }            
    }
    return str;
}