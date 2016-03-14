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
        <title>用户评论：<?php echo $GLOBALS['title']; ?></title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <!-- Le styles -->
        <link href="/dede58/css/bootstrap.min.css" rel="stylesheet">
        <link href="/dede58/css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="/dede58/css/hx-2013.css" rel="stylesheet">

        <!--[if lt IE 9]>
        <link href="/dede58/css/hx-2013-ie5.css" rel="stylesheet">
        <![endif]-->
<script language="javascript" type="text/javascript" src="<?php echo $GLOBALS['cfg_cmsurl']; ?>/include/dedeajax2.js"></script>
<script language="javascript">



function postBadGood(ftype,fid)
{
	var taget_obj = document.getElementById(ftype+fid);
	var saveid = GetCookie('badgoodid');
	if(saveid != null)
	{
		 var saveids = saveid.split(',');
		 var hasid = false;
		 saveid = '';
		 j = 1;
		 for(i=saveids.length-1;i>=0;i--)
		 {
		 	  if(saveids[i]==fid && hasid) continue;
		 	  else {
		 	  	if(saveids[i]==fid && !hasid) hasid = true;
		 	  	saveid += (saveid=='' ? saveids[i] : ','+saveids[i]);
		 	  	j++;
		 	  	if(j==10 && hasid) break;
		 	  	if(j==9 && !hasid) break;
		 	  }
		 }
     if(hasid) { alert('您刚才已表决过了喔！'); return false; }
     else saveid += ','+fid;
		 SetCookie('badgoodid',saveid,1);
	}
	else
	{
		SetCookie('badgoodid',fid,1);
	}
	//document.write("feedback.php?action="+ftype+"&fid="+fid);
	//return;
  myajax = new DedeAjax(taget_obj,false,false,'','','');
  myajax.SendGet2("feedback.php?aid=<?php echo $GLOBALS['aid']; ?>&action="+ftype+"&fid="+fid);
  DedeXHTTP = null;
}

function ajaxFeedback(aid, fid, type)
{
	
	var taget_obj = $DE('ajaxfeedback_'+fid);
	if(taget_obj.innerHTML == '')
	{
		var myajax = new DedeAjax(taget_obj, true, true, '', 'x');
		myajax.SendGet2("<?php echo $GLOBALS['cfg_phpurl']; ?>/feedback.php?aid="+aid+"&fid="+fid+"&action=quote&type=ajax");
		eval('var result = typeof CKEDITOR.instances.msg_'+fid);
		if(result != 'undefined')
		{
			// 删除实例
			eval('var edit = CKEDITOR.instances.msg_'+fid);
			CKEDITOR.remove(edit);
		}
		CKEDITOR.replace(document.getElementById('msg_'+fid) , CKEDITOR.instances.msg.config);
		scroll(0, taget_obj.offsetTop - 120);
		var formname = 'f = document.ajaxfeedback_'+fid;
		eval(formname);
		if(f.validate)
		{
			if($DE('vdimg_'+fid)) $DE('vdimg_'+fid).src = "<?php echo $GLOBALS['cfg_cmsurl']; ?>/include/vdimgck.php?"+f.validate.value;
			f.validate.value = '';
		}
		
		DedeXHTTP = null;
	}
}

function ajaxQuotePost(fid)
{
	var formname = 'f = document.ajaxfeedback_'+fid;
	eval(formname);
	//var f = document.formname;
	//var f = f[0];
	var nvalidate = '';
	var nnotuser = '';
	var nusername = '';
	var npwd = '';
	var msg = document.getElementById("msg").value;
	var taget_obj = $DE('commetcontentNew');
	var waithtml = "<div style='line-height:30px'><img src='<?php echo $GLOBALS['cfg_cmsurl']; ?>/images/loadinglit.gif' />正在发送中...</div>";
	eval('var msg = CKEDITOR.instances.msg_'+fid+'.getData()');

	if(f.validate)
	{
		if(f.validate.value=='') {
			alert("请填写验证码！");
			return;
		}
		else {
			nvalidate = f.validate.value;
		}
	}
	var myajax = new DedeAjax(taget_obj, false, true, '', '', waithtml);
	
	if(f.notuser.checked) nnotuser = '1';
	if(f.username) nusername = f.username.value;
	if(f.pwd) npwd = f.pwd.value;
	if(f.msg) npwd = f.msg.value;
	
	myajax.sendlang = '<?php echo $GLOBALS['cfg_soft_lang']; ?>';
	myajax.AddKeyN('dopost', 'send');
	myajax.AddKeyN('aid', '<?php echo $GLOBALS['aid']; ?>');
	myajax.AddKeyN('fid', f.fid.value);
	myajax.AddKeyN('type', 'ajax');
	myajax.AddKeyN('comtype', f.comtype.value);
	myajax.AddKeyN('isconfirm','yes');
	
	myajax.AddKeyN('typeid', f.typeid.value);
	myajax.AddKeyN('quotemsg', f.quotemsg.value);
	myajax.AddKeyN('validate', nvalidate);
	myajax.AddKeyN('notuser', nnotuser);
	myajax.AddKeyN('username', nusername);
	myajax.AddKeyN('pwd', npwd);
	myajax.AddKeyN('msg', msg);
	myajax.SendPost2('<?php echo $GLOBALS['cfg_phpurl']; ?>/feedback_ajax.php');
	//alert(f.quotemsg.value);
	if($DE('ajaxfeedback_'+fid).innerHTML != null)
	{
		$DE('ajaxfeedback_'+fid).innerHTML = '';
	}
	scroll(0, taget_obj.offsetTop);
	taget_obj.removeAttribute('id');

}
</script>        
    </head>
    <body data-spy="scroll" data-target=".bs-docs-sidebar">
        <div class="container-hx">
        <?php include(DEDEMEMBER."/templets/login_box.htm"); ?>     
		<script src="/plus/mytag_js.php?aid=1" language="javascript"></script>
            <div class="row-fluid-wrap-hx">
                <div class="center-container-hx">
                    <div class="clearfix row-fluid-hx">
<div class="center-ctr-wrap">
    <div class="center-ctr-box">
        <div class="clearfix neirong"> 
            <h1><a href="<?php echo $GLOBALS['arcurl']; ?>" target="_blank"><?php echo $GLOBALS['title']; ?></a></h1>
            <div class="pinglun-all-subtitle"><?php echo $GLOBALS['description']; ?><a href="<?php echo $GLOBALS['arcurl']; ?>" target="_blank">[查看全文]</a></div>
        </div>
        <!-- 评论 -->
        <div class="pinglun" id="pinglun">
                <!-- 评论框框架 -->

<div class="pl-kuang-box">
            <!-- 头像 -->
            <div class="pull-left pl-img" id="_ajax_feedback"                       
                <a target="_blank" href="/member/185011"><img border="0" src="<?php if($cfg_ml->M_Face!='')echo $cfg_ml->M_Face;else echo '/member/templets/images/dfboy.png';?>"></a>
                
                <?php if($cfg_ml->M_ID <= 0) { ?>
                游客
                <?php
                    }else{  echo $cfg_ml->M_UserName; }
                   ?>  
                            
            </div>
            <!-- 头像/ -->
            <!-- 评论框 -->
            <div class="pl-kuang">
        <form action="feedback.php" method="post" name="feedback">
            <input type="hidden" name="action" value="send" />
            <input type="hidden" name="comtype" value="comments">
            <input type="hidden" name="aid" value="<?php echo $aid; ?>" />
            <input type="hidden" name="isconfirm" value="yes" />         	<input type="hidden" name="feedbacktype" value="feedback" />
			<div class="textarea-box"><textarea class="textarea-txt" id="msg" name="msg"></textarea></div>
          <!-- /dcmp-content -->
          <div class="dcmp-post">
            <!--未登陆-->
            <div class="dcmp-userinfo" id="_ajax_feedback"> 
              <input type="hidden" name="username" value="<?php if($cfg_ml->M_ID <= 0) { ?>
                游客
                <?php
                    }else{  echo $cfg_ml->M_UserName; }
                   ?> "/>
              <?php
if(preg_match("/4/",$safe_gdopen)){
              echo '验证码:
              <input type="text" name="validate" size="4" class="ipt-txt" style="text-transform:uppercase;"/>
              <img src= "'.$cfg_cmspath.'/include/vdimgck.php" id="validateimg" style="cursor:pointer" onclick="this.src=this.src+\'?\'" title="点击我更换图片" alt="点击我更换图片"  class="vdimg"/>';
              }
?>
              <input type="hidden" name="notuser" id="dcmp-submit-guest" />

            </div>

            <button class="pull-right subscribe-btn" type="submit" >回复</button>

          </div>
        </form>
            </div>
       <!-- 评论框 -->
        </div> 


<!-- //评论内容区结束 -->

        
    <!-- 评论列表 -->
    <div class="pinglun-list" id="pinglun_list">
    


<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{

  if($fields['userid']!='') $spaceurl = $cfg_basehost.'/member/index.php?uid='.$fields['userid'];
  else $spaceurl = "#";
  if($fields['username']=='匿名') $spaceurl = "#";
  if(empty($fields['mface']))
  {
    if($fields['sex']=="女") $fields['mface']="/member/templets/images/dfgirl.png";
    else $fields['mface']="/member/templets/images/dfboy.png";
  }
?>

               
        <div class="clearfix pinglun-box pinglun-box-set">
        <div class="user-img wz-author">
            <a href="<?php echo $spaceurl; ?>" title="<?php echo $fields['username']; ?>" class="tx-img" target="_blank" ><img src="<?php echo $fields['mface'];?>" width="50" height="50"></a></div>

        <div class="pinglun-box-text">
            <a class="name" href="<?php echo $spaceurl; ?>" target="_blank" title="<?php echo $fields['username']; ?>" ><?php echo $fields['username']; ?></a><span class="signature" title=""></span>
            <div class="view-info"><?php
                echo RemoveXSS(Quote_replace(parseSmileys($fields['msg'],$cfg_cmspath.'/images/smiley')));
                ?></div>
        </div>

        <div class="clearfix view-func">
            <time class="pull-left s-time"><?php
$today = Floor(time()/(3600 * 24));
$senday= Floor($fields['dtime']/(3600 * 24));
$updays = $today-$senday; if($updays==0) $fields['dtime'] = "今日"; elseif($updays>0 && $updays<=3 ) $fields['dtime'] = $updays."天前"; else $fields['dtime'] = MyDate('Y-m-d H:i',$fields['dtime']);
echo $fields['dtime'];
?></time>      
            
            <span class="agree" id='goodfb<?php echo $fields['id']; ?>' onclick="postBadGood('goodfb',<?php echo $fields['id']; ?>);"><i class="icon-i"></i>顶<span>(<?php echo $fields['good']; ?>)</span></span>
            <span class="disagree" onclick="postBadGood('badfb',<?php echo $fields['id']; ?>);"><i class="icon-i"></i>踩<span>(<?php echo $fields['bad']; ?>)</span></span>
        </div></div><!--评论块/end-->
              <div id="ajaxfeedback_<?php echo $fields['id']; ?>"></div>      
              <?php
}
}?>
              
              
                  
		</div>  
        <div class="clearfix pages">
            <div class="pull-right pgs"><?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listitem'] = 'info,index,end,pre,next,pageno';
$atts['listsize'] = '5';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
</div>        </div>
    </div>
    <!-- 评论列表/ -->
        </div>
        <!-- 评论/ -->
    </div>
    
<div class="side-container-hx">

<script src="/plus/mytag_js.php?aid=2" language="javascript"></script>

</div>    
</div>

</div>
<script src="/plus/mytag_js.php?aid=3" language="javascript"></script></div>
</div>
</div>
<div id="append_parent"></div><div id="ajaxwaitid"></div>

    <script src="/plus/mytag_js.php?aid=4" language="javascript"></script>



</body>
</html>