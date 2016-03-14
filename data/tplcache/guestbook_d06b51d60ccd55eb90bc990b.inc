<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="gb2312">
        <title>留言板 - <?php echo $GLOBALS['_vars']['spacename']; ?></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="author" content="<?php echo $GLOBALS['_vars']['uname']; ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <!-- Le styles -->
        <link href="/dede58/css/bootstrap.min.css" rel="stylesheet">
        <link href="/dede58/css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="/dede58/css/hx-2013.css" rel="stylesheet">
        <!--[if lt IE 9]>
        <link href="/dede58/css/hx-2013-ie5.css" rel="stylesheet">
        <![endif]-->
<style>
/* 图文列表*/
.allList2 {
	width:100%;
	clear: both;
}
.allList2 .img {
	float: left;
	margin-right:10px;
	overflow: hidden;
}
.allList2 .txt {
	*float:left;
	overflow: hidden;
}
.allList2 .txt .p1 {
}
.allList2 .txt .p22 {
	color:#666;
}
.allList2 .txt .p3 {
	color:#F52403;
}
/* 图文列表*/
.fRight2 {
	float:right;
}
</style>         
    </head>
    <body data-spy="scroll" data-target=".bs-docs-sidebar">
        <div class="container-hx">
        <?php include(DEDEMEMBER."/templets/login_box.htm"); ?>     
                <script src="/plus/mytag_js.php?aid=1" language="javascript"></script>
            <div class="row-fluid-wrap-hx">
                <div class="center-container-hx">
                    <div class="clearfix row-fluid-hx"><div class="center-ctr-wrap">
    <div class="center-ctr-box">
        <?php include $this->CompilerInclude("author-card.htm");
 ?>
        <div class="personal-homepage">
            <?php include $this->CompilerInclude("author-menu.htm");
 ?>


            <div class="personal-homepage-list">
                    
<div class="east">
    <dl class="border">
      <dt class="caption"><strong>留言</strong></dt>
      <dd class="body pB10"> <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
        <div class="allList2 pTB10 dashed">
          <div class="img" style="width:50px;height:50px;"> <a href="index.php?uid=<?php echo $fields['uname']; ?>&action=infos" title="<?php echo $fields['uname']; ?>" target="_blank">	
          <?php if($fields['face']==''){ 
	         $face='templets/images/dfboy.png';
            echo  '<img src="'.$face.'" width="50" height="50" style="width:50px;height:50px" />';
		   }else{ 
	           echo  '<img src="'.$fields['face'].'" width="50" height="50" style="width:50px;height:50px" alt="'.$fields['uname'].'的头像" />';
	       } ?> </a> </div>
          <div class="txt">
            <p class="p1 mB5">
            <h5 class="fLeft" style="margin-top:-2px;"><a href='index.php?uid=<?php echo $fields['uname']; ?>'><?php echo $fields['gid']; ?></a>：</h5>
           <?php 
            	if($_vars['userid']==$cfg_ml->M_LoginID){
            		echo "<span style='float:right'>&nbsp;<a href='index.php?action=guestbookdel&aid=".$fields['aid']."&uid=".$_vars['userid']."&mid=".$fields['mid']."'>删除</a></span>";
             	}
            ?>
            <span class="aGray fRight2"><?php echo MyDate('Y-m-d H:i',$fields['dtime']); ?></span>
            </p>
            <p class="p22 lh22 f14 aBlack"><?php echo Text2Html($fields['msg']); ?></p>
          </div>
          <div class="clearfix"></div>
        </div>
        <?php
}
}?>
        <div class="fRight2 mTB10 pd10"><?php
$atts = array();
$atts['tagname'] = 'pagelist';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
</div>
        <div class="clearfix"></div>
      </dd>
    </dl>
    <dl class="border mT10">
      <dt class="caption"><strong>给我留言</strong></dt>
      <dd class="body pB10">
        <form action="index.php" name="form1" method="post" class="f14">
          <input type="hidden" name="action" value="guestbooksave" />
          <input type="hidden" name="uidnum" value="<?php echo $GLOBALS['_vars']['mid']; ?>" />
          <input type="hidden" name="uid" value="<?php echo $GLOBALS['_vars']['userid']; ?>" />
          <input type="hidden" name="face" value="<?php echo $cfg_ml->fields['face']?>" />          
		  <label>标题：</label>
		  <input name="title" type="text" id="title"   class="ip" style="width:250px;height:15px;" />
          <textarea name="msg" id="msg" style="width:98%; height:120px;" class="clear mB10 text"></textarea>
          <button class="fRight2 button buttonBlue2" type="submit">提交</button>
          <label>昵称：</label>
          <input name="uname" type="hidden" id="uname" value="<?php if(isset($cfg_ml->M_LoginID) && $cfg_ml->M_LoginID!='') echo $cfg_ml->M_LoginID; ?>" />
          <input name="gid" type="text" id="gid" value="<?php echo $cfg_ml->M_UserName?>" class="text" style="width:100px;" />
          <label>验证码：</label>
          <input name="vdcode" type="text" class="text" id="vdcode" style="width:50px;text-transform:uppercase;" />
          <img src='../include/vdimgck.php' width='50' height='20' align="absmiddle" /><a href="resetpassword.php" class="mL10 mR5">找回密码</a>&nbsp;<a href="../member/index_do.php?fmdo=user&dopost=regnew" title="注册">注册</a>
        </form>
        <p class="mp10 textCenter aGray">以上网友发言只代表其个人观点，不代表本站的观点或立场。</p>
      </dd>
    </dl>
  </div>

</div>            
              <div class="clearfix pages">
                <div class="pull-right pgs"></div>            </div>
        </div>
    </div>
</div>
<?php include $this->CompilerInclude("right.htm");
 ?>
</div>
<script src="/plus/mytag_js.php?aid=3" language="javascript"></script></div>
</div>
</div>
<div id="append_parent"></div><div id="ajaxwaitid"></div>



</body>
</html>