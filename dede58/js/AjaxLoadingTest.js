/**
 * Created by jtrhb on 2016/3/16.
 */
var loadConfig = {
    url_api:'http://localhost/plus/list.php',//����˴���·��
    typeid:0,//����
    page:2,//��ʼҳ��
    pagesize:15,//��ҳ��
    loading : 0,//����״̬,Ĭ��Ϊδ����
}

function  loadMoreApply(){
//���δ�������ݣ��ͼ���
    if(loadConfig.loading == 0){
        var typeid = loadConfig.typeid;
        var page = loadConfig.page;
        var pagesize = loadConfig.pagesize;
        var url = loadConfig.url_api;
        var data={ajax:'pullload',typeid:typeid,page:page,pagesize:pagesize};
        var sTop = document.body.scrollTop || document.documentElement.scrollTop, dHeight = $(document).height(), cHeight = document.documentElement.clientHeight;
//���������߶ȼ����������������߶ȴ��ڵ����ĵ��߶ȼ�ȥ�������������߶�ʱ���ͼ��ء��ĵ��߶ȼ�ȥ�������������߶ȣ����ǿ��Թ��������Թ����ĸ߶�
        if (sTop + cHeight >= dHeight - cHeight) {
            loadConfig.loading = 1;//������״̬��Ϊ�Ѽ���
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
        loadConfig.load_num = rs.load_num;//���ش�����������Ӧ���ڵ��岽���Ѿ���ȡ�����ش���������������
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
//�����ǰҳ����ڼ��ص��ܴ���
            window.removeEventListener('srcoll',loadMoreApply,false);
        }
        loadConfig.page++;//����ҳ��
        loadConfig.loading = 0;//������Ϻ󣬰Ѽ���״̬��Ϊ0
    }
}
function pullLoad(){
    window.addEventListener('scroll', loadMoreApply, false);
}
pullLoad()