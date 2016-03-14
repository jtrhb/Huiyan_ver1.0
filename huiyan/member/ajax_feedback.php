<?php
/**
 * @version        $Id: ajax_feedback.php 1 8:38 2010Äê7ÔÂ9ÈÕZ tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__).'/config.php');
AjaxHead();
if($myurl == '') exit('');

else
{
    $uid  = $cfg_ml->M_LoginID;
    $face = $cfg_ml->fields['face'] == '' ? $GLOBALS['cfg_memberurl'].'/templets/images/nopic.gif' : $cfg_ml->fields['face'];
    echo " <a target='_blank' href='/member/index.php?uid=".$uid."'><img border='0' src='".$face."'></a>{$cfg_ml->M_UserName}";
	
}

