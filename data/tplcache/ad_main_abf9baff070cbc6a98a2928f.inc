<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>">
<title>������</title>
<link href="css/base.css" rel="stylesheet" type="text/css">
</head>
<body background="images/allbg.gif" leftmargin="8" topmargin='8'>
<table width="98%" border="0" align="center" cellpadding="3" cellspacing="1" bgcolor="#D6D6D6">
  <tr>
    <td height="28" background="images/tbg.gif" colspan="7" style="padding-left:10px;">
      <b><a href="ad_main.php">������</a></b>&nbsp;[<a href="ad_add.php"><u>����һ���¹��</u></a>]
    [<a href="adtype_main.php"><u>���������</u></a>]</td>
</tr>
  <tr>
    <td height="28" colspan="7" style="padding-left:10px;" bgcolor="#FFFFFF"><table>
      <tr>
        <form action='ad_main.php' method='get' name='form3' id="form3">
          <input type='hidden' name='dopost' value='listArchives' />
          <td><table width='600' border='0' cellpadding='0' cellspacing='0'>
            <tr>
              <td width='90' align='center'>��ѡ����ࣺ</td>
              <td width='124'><select name='clsid' style='width:150' id="clsid">
                <option value='0'>Ĭ�Ϸ���...</option>
                
          	<?php echo $option;?>
          
              </select></td>
              <td width='71'> �ؼ��֣� </td>
              <td width='185'><input type='text' name='keyword' style='width:150' /></td>
              <td width="130"><input name="imageField" type="image" src="images/button_search.gif" width="60" height="22" border="0" class="np" /></td>
            </tr>
          </table></td>
        </form>
      </tr>
    </table></td>
  </tr>
  <tr align="center"  bgcolor="#FBFCE2"" height="24"> 
      <td width="8%">���</td>
      <td width="20%">����</td>
      <td width="20%">�������</td>
      <td width="12%">Ͷ�ŷ�Χ</td>
      <td width="11%">�Ƿ���ʱ</td>
      <td width="11%">����ʱ��</td>
      <td width="18%">����</td>
   </tr>
   
   <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
    <tr align="center" bgcolor="#FFFFFF" height="24" onMouseMove="javascript:this.bgColor='#FCFDEE';" onMouseOut="javascript:this.bgColor='#FFFFFF';"> 
        <td><?php echo $fields['aid']; ?></td>
        <td><?php echo TestType($fields['clsname'],1); ?></td>
        <td><?php echo $fields['adname']; ?></td>
        <td><?php echo TestType($fields['typename']); ?></td>
        <td><?php echo TimeSetValue($fields['timeset']); ?></td>
        <td><?php echo GetDateMk($fields['endtime']); ?></td>
        <td>
         <a href='ad_edit.php?aid=<?php echo $fields['aid']; ?>&dopost=gettag'>[����]</a>
         <a href='ad_edit.php?aid=<?php echo $fields['aid']; ?>&dopost=edit'>[����]</a>
		     <a href='ad_edit.php?aid=<?php echo $fields['aid']; ?>&dopost=delete'>[ɾ��]</a>
		    </td>
     </tr>
		<?php
}
}?>
     <tr align="center" bgcolor="#F9FCEF" height="24"> 
      <td colspan="7">
      	<?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '5';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>

      </td>
     </tr>
   </table>
   </td>
</tr>
</table>
</body>
</html>