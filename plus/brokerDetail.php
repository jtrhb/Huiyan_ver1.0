<?php
/**
 * Created by PhpStorm.
 * User: jtrhb
 * Date: 2016/4/20
 * Time: 13:18
 */
//����dedecmsдphpʱ��������Ҫ����common.inc.php
require_once (dirname(__FILE__) . "/../include/common.inc.php");
//���ñ���ʽģ��������ļ�
require_once (DEDEINC.'/dedetemplate.class.php');
require_once (DEDEINC.'/extended.partview.class.php');

global $dsql;

if(isset($brokerID)) $bid = $brokerID;
$brokerID = $bid = (isset($bid) && is_numeric($bid)) ? $bid : 0;
$query = "SELECT * FROM `dede_broker` WHERE broker_id='$bid' ";
$arr = $dsql->GetOne($query);
//���ɱ���ģ�����������
//$tpl = new DedeTemplate(DEDEROOT.'/templets/daocao');
$tpl = new extPartView();
//װ����ҳģ��
//$tpl->LoadTemplate(DEDEROOT.'/templets/daocao/broker_detail.htm');
$tagbody = file_get_contents(DEDEROOT.'/templets/daocao/broker_detail.htm');
$tpl->SetTemplet($tagbody,'string');

//��phpֵ����html
$brokerName = $arr['broker_name'];
$tpl->SetVar('brokerName',$brokerName);
//$tpl->Display();
echo $tpl->GetResult();
//�ѱ���õ�ģ�建������code.html���Ϳ���ֱ�ӵ���
//$tpl->SaveTo(dirname(__FILE__).'/code.html');