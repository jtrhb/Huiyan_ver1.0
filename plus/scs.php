<?php
/**
 *
 * �ղش���ͳ��
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
$aid = (isset($aid) && is_numeric($aid)) ? $aid : 0;
$row = $dsql->GetOne("SELECT count(id) AS c FROM `dede_member_stow` WHERE aid='$aid' ");

echo "document.write('{$row['c']}');";
exit();