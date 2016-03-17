<?php
/**
 *
 * 栏目列表/频道动态页
 *
 * @version        $Id: list.php 1 15:38 2010年7月8日Z tianya $
 * @package        DedeCMS.Site
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
//Ajax实现无限加载
if(isset($_GET['ajax'])) {
    $typeid = isset($_GET['typeid']) ? intval($_GET['typeid']) : 0;//传递过来的分类ID
    $page = isset($_GET['page']) ? intval($_GET['page']) : 0;//页码
    $pagesize = isset($_GET['pagesize']) ? intval($_GET['pagesize']) : 15;//每页多少条，也就是一次加载多少条数据
    $articletype = isset($_GET['articletype'])?($_GET['articletype']):'';//文章类型
    $start = $page > 0 ? ($page - 1) * $pagesize : 0;//数据获取的起始位置。即limit条件的第一个参数。
    $typesql = $typeid ? "typeid='$typeid'" : '';//这个是用于首页实现瀑布流加载，因为首页加载数据是无需分类的，所以要加以判断，如果无需
    $arctypesql = ($articletype == 'latestArticles')?'':"addf.articletype='$articletype'";
    $whereclause = ($arctypesql == '')?'':$arctypesql;
    $whereclause = ($typesql == '')?$whereclause:$whereclause.' AND '.$typesql;
    $whereclause = ($whereclause == '')?'':"WHERE $whereclause";
    $total_sql = "SELECT COUNT(a.id) as num FROM `#@__archives` AS a  LEFT JOIN `#@__addonarticle` AS addf ON a.id=addf.aid  $whereclause";
    $temp = $dsql->GetOne($total_sql);
    $total = 0;//数据总数
    $load_num = 0;
    if (is_array($temp)) {
        $load_num = round(($temp['num'] - 15) / $pagesize);//要加载的次数,因为默认已经加载了
        $total = $temp['num'];
    }
    $sql = "SELECT a.*,t.typedir,t.typename,t.isdefault,t.defaultname,t.namerule,t.namerule2,t.ispart, t.moresite,t.siteurl,t.sitepath, addf.articletype FROM `#@__archives` as a JOIN `#@__arctype` AS t ON a.typeid=t.id LEFT JOIN `#@__addonarticle` AS addf ON a.id=addf.aid  $whereclause ORDER BY sortrank  DESC LIMIT $start,$pagesize";
    $dsql->SetQuery($sql);
    $dsql->Execute('list');
    $statu = 0;//是否有数据，默认没有数据
    $data = array();
    $index = 0;
    while ($row = $dsql->GetArray("list")) {
        $row['info'] = $row['info'] = $row['infos'] = cn_substr($row['description'], 160);
        $row['info'] = iconv("GBK","UTF-8//IGNORE",$row['info']);//转换GBK编码中文字符为UTF-8，json_encode无法识别GBK编码的中文，为配合前端Javascript接收数据
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
        $row['picname'] = $row['litpic'];//缩略图
        $row['stime'] = GetDateTimeMK($row['pubdate']);//只要日期的话用GetDateMK();
        $row['tagsById'] = GetTags($row['id']);
        $row['tagsById'] = iconv("GBK","UTF-8//IGNORE",$row['tagsById']);
        $row['typelink'] = "<a href='" . $row['typeurl'] . "'>" . $row['typename'] . "</a>";//分类链
        $row['fulltitle'] = $row['title'];//完整的标题
        $row['fulltitle'] = iconv("GBK","UTF-8//IGNORE",$row['fulltitle']);
        $row['keywords'] = iconv("GBK","UTF-8//IGNORE",$row['keywords']);
        $row['writer'] = iconv("GBK","UTF-8//IGNORE",$row['writer']);
        $row['description'] = iconv("GBK","UTF-8//IGNORE",$row['description']);
        $row['title'] = iconv("GBK","UTF-8",cn_substr($row['title'], 60));//截取后的标题
        $data[$index] = $row;
        $index++;
    }
    if (!empty($data)) {
        $statu = 1;//有数据
    }
    $result = array('statu' => $statu, 'list' => $data, 'total' => $total, 'load_num' => $load_num);
    echo json_encode($result);//返回数据
    exit();
}

//$t1 = ExecTime();


$tid = (isset($tid) && is_numeric($tid) ? $tid : 0);

$channelid = (isset($channelid) && is_numeric($channelid) ? $channelid : 0);

if($tid==0 && $channelid==0) die(" Request Error! ");
if(isset($TotalResult)) $TotalResult = intval(preg_replace("/[^\d]/", '', $TotalResult));


//如果指定了内容模型ID但没有指定栏目ID，那么自动获得为这个内容模型的第一个顶级栏目作为频道默认栏目
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
    //对设置了会员级别的栏目进行处理
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
            $memberTypes[0] = "游客或没权限会员";
            $msgtitle = "你没有权限浏览栏目：{$lv->Fields['typename']} ！";
            $moremsg = "这个栏目需要 <font color='red'>".$memberTypes[$lv->Fields['corank']]."</font> 才能访问，你目前是：<font color='red'>".$memberTypes[$cfg_ml->M_Rank]."</font> ！";
            include_once(DEDETEMPLATE.'/plus/view_msg_catalog.htm');
            exit();
        }
    }
}

if($lv->IsError) ParamError();

$lv->Display();
