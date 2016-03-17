/**
 * Created by jtrhb on 2016/3/15.
 */
//Ajax 无限加载文章
var loadConfig = {
    url_api:'http://localhost/plus/list.php',//服务端处理路径
    typeid:0,//分类
    page:{
        latestArticles:2,
        industryNews:2,
        view:2,
        deepInsight:2,
        etc:2
    },//开始页码
    total:{
        latestArticles:2,
        industryNews:2,
        view:2,
        deepInsight:2,
        etc:2
    },//总文章数
    arr:{
        latestArticles:[],
        industryNews:[],
        view:[],
        deepInsight:[],
        etc:[]
    },//文章内容Array
    pagesize: 15,//分页数
    loading : {
        latestArticles:0,
        industryNews:0,
        view:0,
        deepInsight:0,
        etc:0
    },//加载状态,默认为未加载
    loaded : {
        latestArticles:0,
        industryNews:0,
        view:0,
        deepInsight:0,
        etc:0
    }
};

function  loadMoreApply(){
    var articletype = $('#myTab').children('.active').children('a').attr('href');
    articletype = articletype.substr(1);
    //如果未加载数据，就加载
    if(loadConfig.loading[articletype] == 0 && loadConfig.loaded[articletype] == 0){
        var typeid = loadConfig.typeid;
        var page = loadConfig.page[articletype];
        var pagesize = loadConfig.pagesize;
        var url = loadConfig.url_api;
        var data={ajax:'pullload',typeid:typeid,page:page,pagesize:pagesize,articletype:articletype};
        var sTop = document.body.scrollTop || document.documentElement.scrollTop, dHeight = $(document).height(), cHeight = document.documentElement.clientHeight;
//当滚动条高度加上浏览器可视区域高度大于等于文档高度减去浏览器可视区域高度时，就加载。文档高度减去浏览器可视区域高度，就是可以滚动条可以滚动的高度
        if (sTop + cHeight >= dHeight - cHeight) {
            loadConfig.loading[articletype] = 1;//将加载状态改为已加载
            function ajax(url, data) {
                $.ajax({url: url,data: data,async: false,type: 'GET',dataType: 'json',success: function(data) {
                    addContent(data,articletype);
                }});
            }
            ajax(url,data);
        }
    }
}

function addContent  (rs,articletype){
    if(rs.statu== 1){
        var data = rs.list;
        var total = rs.total;
        loadConfig.load_num = rs.load_num;//加载次数，按道理应该在第五步就已经获取到加载次数和数据总数的
        var attSpan='';
        var length = data.length;
        for(var i=0;i<length;i++){
            switch(data[i].articletype)
            {
                case "industryNews":
                    attSpan='<span class="articletype arc-type-in">产业新闻</span>';
                    break;
                case "view":
                    attSpan='<span class="articletype arc-type-v">观点</span>';
                    break;
                case "deepInsight":
                    attSpan='<span class="articletype arc-type-di">深度测评</span>';
                    break;
                case "etc":
                    attSpan='<span class="articletype arc-type-etc">其他</span>';
                    break;
            }
            loadConfig.arr[articletype].push('<div class="clearfix article-box ">');
            loadConfig.arr[articletype].push(attSpan);
            loadConfig.arr[articletype].push('<a href="'+data[i].arcurl+'" class="a-img" target="_blank"><img src="'+data[i].picname+'" width="220" height="146"/></a>');
            loadConfig.arr[articletype].push('<div class="article-box-ctt">');
            loadConfig.arr[articletype].push('<h4><a href="'+data[i].arcurl+'" target="_blank">'+data[i].fulltitle+'</a></h4>');
            loadConfig.arr[articletype].push('<div class="box-other">');
            loadConfig.arr[articletype].push('<span class="source-quote">'+data[i].writer+'</span>');
            loadConfig.arr[articletype].push('<time>'+data[i].stime+'</time></div>');//GetDateTimeMK(@me)
            loadConfig.arr[articletype].push('<div class="article-summary">'+data[i].description+'</div>');
            loadConfig.arr[articletype].push('<p class="tags-box">'+data[i].tagsById+'<i class="i-icon-bottom"></i></p></div>');//function=GetTags(@me)
            loadConfig.arr[articletype].push('<div class="idx-hldj"><div class="article-icon"><span class="comment-box"><i class="icon-comment"></i>');
            loadConfig.arr[articletype].push('<a href="'+data[i].arcurl+'" target="_blank">');
            //arr.push('<script src="/plus/pls.php?aid='+data[i].id+'" language="javascript"></script></a></span></div></div></div>');
            loadConfig.arr[articletype].push('</a></span></div></div></div>');

        }
        //var appendArticles = loadConfig.arr[articletype].join('');
        //var tabSelector = '#'+articletype+' div:first';
        //$(tabSelector).append(appendArticles);//Jquery选择要加载的DIV
        if(total<loadConfig.page[articletype]*loadConfig.pagesize || loadConfig.page[articletype] > loadConfig.load_num){
//如果当前页码大于加载的总次数
            loadConfig.loaded[articletype] = 1;
            var flagForRemoveListner = 1;
            for(var name in loadConfig.loaded){
                flagForRemoveListner = flagForRemoveListner && loadConfig.loaded[name];
            }
            if(flagForRemoveListner == 1){
                window.removeEventListener('srcoll',loadMoreApply,false);
            }
        }
        //loadConfig.page[articletype]++;//递增页码
    }
    //loadConfig.loading = 0;//加载完毕后，把加载状态改为0
    /*
    else{
        var lmSelector = '#'+articletype+' div.idx-more';
        $(lmSelector).remove();
    }
    */
}

function loadDataToDom(){
    var articletype = $('#myTab').children('.active').children('a').attr('href');
    articletype = articletype.substr(1);
    var appendArticles = loadConfig.arr[articletype].join('');
    var tabSelector = '#'+articletype+' div:first';
    $(tabSelector).append(appendArticles);//Jquery选择要加载的DIV

    if(loadConfig.loaded[articletype]){
        var lmSelector = '#'+articletype+' div.idx-more';
        $(lmSelector).remove();
    }

    appendArticles = '';
    loadConfig.arr[articletype] = [];
    loadConfig.page[articletype]++;//递增页码
    loadConfig.loading[articletype] = 0;//加载完毕后，把加载状态改为0
}

function pullLoad(){
    window.addEventListener('scroll', loadMoreApply, false);
}
pullLoad()