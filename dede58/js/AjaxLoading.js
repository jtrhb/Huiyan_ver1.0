/**
 * Created by jtrhb on 2016/3/15.
 */
//Ajax ���޼�������
var loadConfig = {
    url_api:'http://localhost/plus/list.php',//����˴���·��
    typeid:0,//����
    page:{
        latestArticles:2,
        industryNews:2,
        view:2,
        deepInsight:2,
        etc:2
    },//��ʼҳ��
    total:{
        latestArticles:2,
        industryNews:2,
        view:2,
        deepInsight:2,
        etc:2
    },//��������
    arr:{
        latestArticles:[],
        industryNews:[],
        view:[],
        deepInsight:[],
        etc:[]
    },//��������Array
    pagesize: 15,//��ҳ��
    loading : {
        latestArticles:0,
        industryNews:0,
        view:0,
        deepInsight:0,
        etc:0
    },//����״̬,Ĭ��Ϊδ����
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
    //���δ�������ݣ��ͼ���
    if(loadConfig.loading[articletype] == 0 && loadConfig.loaded[articletype] == 0){
        var typeid = loadConfig.typeid;
        var page = loadConfig.page[articletype];
        var pagesize = loadConfig.pagesize;
        var url = loadConfig.url_api;
        var data={ajax:'pullload',typeid:typeid,page:page,pagesize:pagesize,articletype:articletype};
        var sTop = document.body.scrollTop || document.documentElement.scrollTop, dHeight = $(document).height(), cHeight = document.documentElement.clientHeight;
//���������߶ȼ����������������߶ȴ��ڵ����ĵ��߶ȼ�ȥ�������������߶�ʱ���ͼ��ء��ĵ��߶ȼ�ȥ�������������߶ȣ����ǿ��Թ��������Թ����ĸ߶�
        if (sTop + cHeight >= dHeight - cHeight) {
            loadConfig.loading[articletype] = 1;//������״̬��Ϊ�Ѽ���
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
        loadConfig.load_num = rs.load_num;//���ش�����������Ӧ���ڵ��岽���Ѿ���ȡ�����ش���������������
        var attSpan='';
        var length = data.length;
        for(var i=0;i<length;i++){
            switch(data[i].articletype)
            {
                case "industryNews":
                    attSpan='<span class="articletype arc-type-in">��ҵ����</span>';
                    break;
                case "view":
                    attSpan='<span class="articletype arc-type-v">�۵�</span>';
                    break;
                case "deepInsight":
                    attSpan='<span class="articletype arc-type-di">��Ȳ���</span>';
                    break;
                case "etc":
                    attSpan='<span class="articletype arc-type-etc">����</span>';
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
        //$(tabSelector).append(appendArticles);//Jqueryѡ��Ҫ���ص�DIV
        if(total<loadConfig.page[articletype]*loadConfig.pagesize || loadConfig.page[articletype] > loadConfig.load_num){
//�����ǰҳ����ڼ��ص��ܴ���
            loadConfig.loaded[articletype] = 1;
            var flagForRemoveListner = 1;
            for(var name in loadConfig.loaded){
                flagForRemoveListner = flagForRemoveListner && loadConfig.loaded[name];
            }
            if(flagForRemoveListner == 1){
                window.removeEventListener('srcoll',loadMoreApply,false);
            }
        }
        //loadConfig.page[articletype]++;//����ҳ��
    }
    //loadConfig.loading = 0;//������Ϻ󣬰Ѽ���״̬��Ϊ0
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
    $(tabSelector).append(appendArticles);//Jqueryѡ��Ҫ���ص�DIV

    if(loadConfig.loaded[articletype]){
        var lmSelector = '#'+articletype+' div.idx-more';
        $(lmSelector).remove();
    }

    appendArticles = '';
    loadConfig.arr[articletype] = [];
    loadConfig.page[articletype]++;//����ҳ��
    loadConfig.loading[articletype] = 0;//������Ϻ󣬰Ѽ���״̬��Ϊ0
}

function pullLoad(){
    window.addEventListener('scroll', loadMoreApply, false);
}
pullLoad()