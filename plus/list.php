<?php
/**
 *
 * ��Ŀ�б�/Ƶ����̬ҳ
 *
 * @version        $Id: list.php 1 15:38 2010��7��8��Z tianya $
 * @package        DedeCMS.Site
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
//Ajaxʵ�����޼���
if(isset($_GET['ajax'])) {
    $typeid = isset($_GET['typeid']) ? intval($_GET['typeid']) : 0;//���ݹ����ķ���ID
    $page = isset($_GET['page']) ? intval($_GET['page']) : 0;//ҳ��
    $pagesize = isset($_GET['pagesize']) ? intval($_GET['pagesize']) : 15;//ÿҳ��������Ҳ����һ�μ��ض���������
    $articletype = isset($_GET['articletype'])?($_GET['articletype']):'';//��������
    $start = $page > 0 ? ($page - 1) * $pagesize : 0;//���ݻ�ȡ����ʼλ�á���limit�����ĵ�һ��������
    $typesql = $typeid ? "typeid='$typeid'" : '';//�����������ҳʵ���ٲ������أ���Ϊ��ҳ�����������������ģ�����Ҫ�����жϣ��������
    $arctypesql = ($articletype == 'latestArticles')?'':"addf.articletype='$articletype'";
    $whereclause = ($arctypesql == '')?'':$arctypesql;
    $whereclause = ($typesql == '')?$whereclause:$whereclause.' AND '.$typesql;
    $whereclause = ($whereclause == '')?'':"WHERE $whereclause";
    $total_sql = "SELECT COUNT(a.id) as num FROM `#@__archives` AS a  LEFT JOIN `#@__addonarticle` AS addf ON a.id=addf.aid  $whereclause";
    $temp = $dsql->GetOne($total_sql);
    $total = 0;//��������
    $load_num = 0;
    if (is_array($temp)) {
        $load_num = round(($temp['num'] - 15) / $pagesize);//Ҫ���صĴ���,��ΪĬ���Ѿ�������
        $total = $temp['num'];
    }
    $sql = "SELECT a.*,t.typedir,t.typename,t.isdefault,t.defaultname,t.namerule,t.namerule2,t.ispart, t.moresite,t.siteurl,t.sitepath, addf.articletype FROM `#@__archives` as a JOIN `#@__arctype` AS t ON a.typeid=t.id LEFT JOIN `#@__addonarticle` AS addf ON a.id=addf.aid  $whereclause ORDER BY sortrank  DESC LIMIT $start,$pagesize";
    $dsql->SetQuery($sql);
    $dsql->Execute('list');
    $statu = 0;//�Ƿ������ݣ�Ĭ��û������
    $data = array();
    $index = 0;
    while ($row = $dsql->GetArray("list")) {
        $row['info'] = $row['info'] = $row['infos'] = cn_substr($row['description'], 160);
        $row['info'] = iconv("GBK","UTF-8//IGNORE",$row['info']);//ת��GBK���������ַ�ΪUTF-8��json_encode�޷�ʶ��GBK��������ģ�Ϊ���ǰ��Javascript��������
        $row['id'] = $row['id'];
        $row['filename'] = $row['arcurl'] = GetFileUrl($row['id'], $row['typeid'], $row['senddate'], $row['title'], $row['ismake'],
            $row['arcrank'], $row['namerule'], $row['typedir'], $row['money'], $row['filename'], $row['moresite'], $row['siteurl'], $row['sitepath']);
        $row['typeurl'] = GetTypeUrl($row['typeid'], $row['typedir'], $row['isdefault'], $row['defaultname'], $row['ispart'],
            $row['namerule2'], $row['moresite'], $row['siteurl'], $row['sitepath']);
        if ($row['litpic'] == '-' || $row['litpic'] == '') {
            $row['litpic'] = $GLOBALS['cfg_cmspath'] . '/images/defaultpic.gif';
        }
        if (!preg_match("#^http:\/\/#i", $row['litpic']) && $GLOBALS['cfg_multi_site'] == 'Y') {
            $row['litpic'] = $GLOBALS['cfg_mainsite'] . $row['litpic'];
        }
        $row['picname'] = $row['litpic'];//����ͼ
        $row['stime'] = GetDateTimeMK($row['pubdate']);//ֻҪ���ڵĻ���GetDateMK();
        $row['tagsById'] = GetTags($row['id']);
        $row['tagsById'] = iconv("GBK","UTF-8//IGNORE",$row['tagsById']);
        $row['typelink'] = "<a href='" . $row['typeurl'] . "'>" . $row['typename'] . "</a>";//������
        $row['fulltitle'] = $row['title'];//�����ı���
        $row['fulltitle'] = iconv("GBK","UTF-8//IGNORE",$row['fulltitle']);
        $row['keywords'] = iconv("GBK","UTF-8//IGNORE",$row['keywords']);
        $row['writer'] = iconv("GBK","UTF-8//IGNORE",$row['writer']);
        $row['description'] = iconv("GBK","UTF-8//IGNORE",$row['description']);
        $row['title'] = iconv("GBK","UTF-8",cn_substr($row['title'], 60));//��ȡ��ı���
        $data[$index] = $row;
        $index++;
    }
    if (!empty($data)) {
        $statu = 1;//������
    }
    $result = array('statu' => $statu, 'list' => $data, 'total' => $total, 'load_num' => $load_num);
    echo json_encode($result);//��������
    exit();
}

//$t1 = ExecTime();


$tid = (isset($tid) && is_numeric($tid) ? $tid : 0);

$channelid = (isset($channelid) && is_numeric($channelid) ? $channelid : 0);

if($tid==0 && $channelid==0) die(" Request Error! ");
if(isset($TotalResult)) $TotalResult = intval(preg_replace("/[^\d]/", '', $TotalResult));


//���ָ��������ģ��ID��û��ָ����ĿID����ô�Զ����Ϊ�������ģ�͵ĵ�һ��������Ŀ��ΪƵ��Ĭ����Ŀ
if(!empty($channelid) && empty($tid))
{
    $tinfos = $dsql->GetOne("SELECT tp.id,ch.issystem FROM `#@__arctype` tp LEFT JOIN `#@__channeltype` ch ON ch.id=tp.channeltype WHERE tp.channeltype='$channelid' And tp.reid=0 order by sortrank asc");
    if(!is_array($tinfos)) die(" No catalogs in the channel! ");
    $tid = $tinfos['id'];
}
else
{
    $tinfos = $dsql->GetOne("SELECT ch.issystem FROM `#@__arctype` tp LEFT JOIN `#@__channeltype` ch ON ch.id=tp.channeltype WHERE tp.id='$tid' ");
}

if($tinfos['issystem']==-1)
{
    $nativeplace = ( (empty($nativeplace) || !is_numeric($nativeplace)) ? 0 : $nativeplace );
    $infotype = ( (empty($infotype) || !is_numeric($infotype)) ? 0 : $infotype );
    if(!empty($keyword)) $keyword = FilterSearch($keyword);
    $cArr = array();
    if(!empty($nativeplace)) $cArr['nativeplace'] = $nativeplace;
    if(!empty($infotype)) $cArr['infotype'] = $infotype;
    if(!empty($keyword)) $cArr['keyword'] = $keyword;
    include(DEDEINC."/arc.sglistview.class.php");
    $lv = new SgListView($tid,$cArr);
} else {
    include(DEDEINC."/arc.listview.class.php");
    $lv = new ListView($tid);
    //�������˻�Ա�������Ŀ���д���
    if(isset($lv->Fields['corank']) && $lv->Fields['corank'] > 0)
    {
        require_once(DEDEINC.'/memberlogin.class.php');
        $cfg_ml = new MemberLogin();
        if( $cfg_ml->M_Rank < $lv->Fields['corank'] )
        {
            $dsql->Execute('me' , "SELECT * FROM `#@__arcrank` ");
            while($row = $dsql->GetObject('me'))
            {
                $memberTypes[$row->rank] = $row->membername;
            }
            $memberTypes[0] = "�οͻ�ûȨ�޻�Ա";
            $msgtitle = "��û��Ȩ�������Ŀ��{$lv->Fields['typename']} ��";
            $moremsg = "�����Ŀ��Ҫ <font color='red'>".$memberTypes[$lv->Fields['corank']]."</font> ���ܷ��ʣ���Ŀǰ�ǣ�<font color='red'>".$memberTypes[$cfg_ml->M_Rank]."</font> ��";
            include_once(DEDETEMPLATE.'/plus/view_msg_catalog.htm');
            exit();
        }
    }
}

if($lv->IsError) ParamError();

$lv->Display();
