<?php
/**
 * Created by PhpStorm.
 * User: jtrhb
 * Date: 2016/4/20
 * Time: 13:18
 */
//利用dedecms写php时，基本都要引入common.inc.php
require_once (dirname(__FILE__) . "/../include/common.inc.php");
//利用编译式模板所需的文件
require_once (DEDEINC.'/dedetemplate.class.php');
require_once (DEDEINC.'/extended.partview.class.php');

global $dsql;

if(isset($brokerID)) $bid = $brokerID;
$brokerID = $bid = (isset($bid) && is_numeric($bid)) ? $bid : 0;
$query = "SELECT * FROM `dede_broker` WHERE broker_id='$bid' ";
$arr = $dsql->GetOne($query);
//生成编译模板引擎类对象
//$tpl = new DedeTemplate(DEDEROOT.'/templets/daocao');
$tpl = new extPartView();
//装载网页模板
//$tpl->LoadTemplate(DEDEROOT.'/templets/daocao/broker_detail.htm');
$tagbody = file_get_contents(DEDEROOT.'/templets/daocao/broker_detail.htm');
$tpl->SetTemplet($tagbody,'string');

//把php值传到html
$brokerName = $arr['broker_name'];
$tpl->SetVar('brokerName',$brokerName);
//$tpl->Display();
echo $tpl->GetResult();
//把编译好的模板缓存做成code.html，就可以直接调用
//$tpl->SaveTo(dirname(__FILE__).'/code.html');