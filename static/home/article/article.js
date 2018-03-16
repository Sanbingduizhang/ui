
//其他
//内容右边的标签生成
$(function (){
    var id = Number(window.location.href.split('?')[1].split('=')[1]);
    $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/home/article/index/"+id+"?right=769",
            dataType:"json",
            success:function(data){
                //页码
                var yema = data.data;
                //左边对应分类文章显示
                var str = su(data);
                $('.con-left').html(str);
                //右边推荐文章
                var recc = rec(data);
                $('.con-right-recon-ul').html(recc);
                //右边热门文正
                var ree = re(data);
                $('.con-right-re-ul').html(ree);
                //右边分类
                var catess = cates(data);
                $('.con-right-li-ul').html(catess);
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
                            url:"http://www.heijiang.top/home/article/index/"+id+"?page="+api.getCurrent(),
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
    //登录功能
    $('#linkSub').click(function() {
        $('#login').show();
        $('#bg').show();
    });
    $('#closeBtn').click(function() {
        $('#login').hide();
        $('#bg').hide();
    });
    //点击分类加载对应页面
    $('.con-right-li-ul').on('click','.con-right-a',function(){
        var catemid = $(this).attr('catemid');
        $.ajax({
            type:"GET",
            url:"http://www.heijiang.top/home/article/index/"+catemid,
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
                            url:"http://www.heijiang.top/home/article/index/"+catemid+"?page="+api.getCurrent(),
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
    //点击搜索，搜索对应页面
    $('#btnSea').click(function(){
        var serRes = $('#search').val();
        if(!serRes){
            alert('请输入搜索内容');
        }else{
            $.ajax({
                type:"GET",
                url:"http://www.heijiang.top/home/article/index?search="+serRes,
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
                                url:"http://www.heijiang.top/home/article/index?page="+api.getCurrent()+"&search="+serRes,
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
        };

    });
});

