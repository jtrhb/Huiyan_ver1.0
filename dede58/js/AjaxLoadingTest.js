/**
 * Created by jtrhb on 2016/3/16.
 */
var loadConfig = {
    url_api:'http://localhost/plus/list.php',//服务端处理路径
    typeid:0,//分类
    page:2,//开始页码
    pagesize:15,//分页数
    loading : 0,//加载状态,默认为未加载
}

function  loadMoreApply(){
//如果未加载数据，就加载
    if(loadConfig.loading == 0){
        var typeid = loadConfig.typeid;
        var page = loadConfig.page;
        var pagesize = loadConfig.pagesize;
        var url = loadConfig.url_api;
        var data={ajax:'pullload',typeid:typeid,page:page,pagesize:pagesize};
        var sTop = document.body.scrollTop || document.documentElement.scrollTop, dHeight = $(document).height(), cHeight = document.documentElement.clientHeight;
//当滚动条高度加上浏览器可视区域高度大于等于文档高度减去浏览器可视区域高度时，就加载。文档高度减去浏览器可视区域高度，就是可以滚动条可以滚动的高度
        if (sTop + cHeight >= dHeight - cHeight) {
            loadConfig.loading = 1;//将加载状态改为已加载
            function ajax(url, data) {
                $.ajax({url: url,data: data,async: false,type: 'GET',dataType: 'json',success: function(data) {
                    addContent(data);
                }});
            }
            ajax(url,data);
        }
    }
}

function addContent  (rs){
    if(rs.statu== 1){
        var data = rs.list;
        var total = rs.total;
        loadConfig.load_num = rs.load_num;//加载次数，按道理应该在第五步就已经获取到加载次数和数据总数的
        var arr=[];
        var length = data.length;
        for(var i=0;i<length;i++){
            arr.push('<a href="'+data[i].arcurl+'" class="list-item-box" title="'+data[i].title+'">');
            arr.push('<dl class="list-item">');
            arr.push('<dt class="pic"><img src="'+data[i].picname+'" width="80" height="60"/></dt>');
            arr.push('<dd><div class="news-info">');
            arr.push('<div class="news-title">'+data[i].title+'</div>');
            arr.push('<div class="news-info-bottom">');
            arr.push('<span>'+data[i].typename+'</span><span class="news-    date">'+data[i].pubdate+'</span>');
            arr.push('</div></dd></dl></a>');
        }
        $('#latestArticles').append(arr.join(''));
        if(total<loadConfig.page*loadConfig.pagesize || loadConfig.page > loadConfig.load_num){
//如果当前页码大于加载的总次数
            window.removeEventListener('srcoll',loadMoreApply,false);
        }
        loadConfig.page++;//递增页码
        loadConfig.loading = 0;//加载完毕后，把加载状态改为0
    }
}
function pullLoad(){
    window.addEventListener('scroll', loadMoreApply, false);
}
pullLoad()