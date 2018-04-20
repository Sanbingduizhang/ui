
//其他
//内容右边的标签生成
$(function (){
    
    //点击搜索，搜索对应页面
    $('#btnSea').click(function(){
            $.ajax({
                type:"POST",
                url:"http://laravelgo.com/home/photo/uploads",
                dataType:"json",
                
                success:function(data){
                    //页码
                    var yema = data.data;
                    //左边对应分类文章显示
                    var str = su(data);
                    $('.con-left').html(str);
                    //分类标题
                    $('.cate').text(data.data.cate_name);
                    $('.M-box1').pagination({
                        //页码总条数
                        totalData: yema.total,
                        //页码每一页显示条数
                        showData: yema.per_page,
                        //页码当前页
                        current:yema.current_page,
                        coping: true,
                        callback:function(api){
                            $.ajax({
                                type:"GET",
                                url:"http://laravelgo.com/home/article/index?page="+api.getCurrent()+"&search="+serRes,
                                dataType:"json",
                                success:function(data){
                                    //左边对应分类的文章
                                    var str = su(data);
                                    $('.con-left').html(str);
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
        

    });

    // 点击新建按钮显示上传文件的页面
    $('#btnUpload').click(function() {
        $('#demo').show();
        $('#bg').show();
    });
});

