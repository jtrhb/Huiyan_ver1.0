<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><div class="top">
    <div class="top-box">
        <h1 class="logo"><a href="/" target="_blank"><img src="/dede58/img/top_logo.png"></a></h1>
        <div class="login-box" id="_userlogin">


<?php
//δ��¼��ʾ��head
if(!$cfg_ml->IsLogin()) {
?>
            <div class="btn-group">
                <a href="<?php echo $cfg_memberurl; ?>/article_add.php" class="contribute" title="Ͷ��">Ͷ��</a>
            </div>

            <div class="btn-group">
                <a href="#lgnModal" data-toggle="modal">��¼</a>
                <a href="/member/index_do.php?fmdo=user&dopost=regnew">ע��</a>
            </div>

            
            <div class="btn-group">
                <a href="/rss.php" title="RSS"><i class="icon-rss"></i></a>
            </div>
<?php
}
//��¼����ʾ��head
else {
$uid  = $cfg_ml->M_LoginID;

!$cfg_ml->fields['face'] && $face = ($cfg_ml->fields['sex'] == 'Ů')? 'dfgirl' : 'dfboy';
$facepic = empty($face)? $cfg_ml->fields['face'] : $face;


?>


            <div class="btn-group">
                <a title="Ͷ��" class="contribute" href="<?php echo $cfg_memberurl; ?>/article_add.php">Ͷ��</a>
            </div>
            <div class="btn-group">
                <span class="lgn-user-face"><img width="24px" border="0" height="24px" src="<?php if($facepic!='dfboy') echo $facepic;else echo '/member/templets/images/dfboy.png';?>"></span>
                <a title="�ҵ���ҳ" class="username" target="_blank" href="<?php echo $myurl;?>"><?php echo $cfg_ml->M_UserName; ?></a>
            </div>
            <div class="btn-group">
                <a title="�ҵ��ղ�" href="<?php echo $cfg_memberurl; ?>/mystow.php"><i class="icon-star-empty"></i></a>
            </div>
            <div class="btn-group">
                <a title="�ҵ���Ϣ" data-toggle="dropdown" class="dropdown-toggle num" href="<?php echo $cfg_memberurl; ?>/guestbook_admin.php"><i class="icon-envelope"></i>       <?php
       $pms = $dsql->GetOne("SELECT COUNT(*) AS nums FROM #@__member_pms WHERE toid='{$cfg_ml->M_ID}' AND `hasview`=0 AND folder = 'inbox'");
		if($pms['nums'] > 0)
		{
			echo "<sup>{$pms['nums']}</sup>";
		}
		elseif($pms['nums']==0)
		{
			echo "";
		}
       ?></a>
                <ul aria-labelledby="dLabel" role="menu" class="dropdown-menu num-dropdown">
                    <li><a href="<?php echo $cfg_memberurl; ?>/pm.php">�ҵ�˽��</a></li>
                                        <li><a href="<?php echo $cfg_memberurl; ?>/guestbook_admin.php">�ҵ�����</a></li>
                                    </ul>
            </div>
            <div class="btn-group">
                <a title="�ҵ�����" data-toggle="dropdown" class="dropdown-toggle num" href="javascript:void(0);"><i class="icon-cog"></i></a>
                <ul aria-labelledby="dLabel" role="menu" class="dropdown-menu num-dropdown">
                    <li><a href="<?php echo $cfg_memberurl; ?>/index.php?uid=<?php echo $uid;?>">�ҵĿռ�</a></li>
                    <li><a href="<?php echo $cfg_memberurl; ?>/index.php?uid=<?php echo $uid;?>&action=archives">�ҵ�����</a></li>
                    <li><a href="<?php echo $cfg_memberurl; ?>/edit_fullinfo.php">�ҵ�����</a></li>
                    <li><a class="logout-btn" href="<?php echo $cfg_memberurl; ?>/index_do.php?fmdo=login&dopost=exit">ע����¼</a> </li>
                </ul>
            </div>
            
            <div class="btn-group">
                <a title="RSS" href="/rss.php"><i class="icon-rss"></i></a>
            </div>

<?php
}
?>
        </div>
    </div>
</div>


<div id="lgnModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">��</button>
            <h3 id="myModalLabel">��¼</h3>
        </div>
        <div class="float-box">
            <div class="float-login-box">
                <div class="login-info">�ʺŵ�¼��</div>
                <form id="float_form_lgn" name="userlogin" action="<?php echo $cfg_memberurl; ?>/index_do.php" method="POST" class="form-horizontal">
        <input type="hidden" name="fmdo" value="login" />
        <input type="hidden" name="dopost" value="login" />
        <input type="hidden" name="keeptime" value="604800" />                
                
                    <div class="control-group control-name">
                        <label class="control-label" for="inputName">�û�����</label>
                        <div class="controls">
                            <input type="text" id="userid" name="userid" tabindex="1">
                            <span class="help-inline"><a href="<?php echo $cfg_memberurl; ?>/index_do.php?fmdo=user&dopost=regnew" target="_blank">��δע��?</a></span>
                        </div>
                    </div>
                    <div class="control-group control-pwd">
                        <label class="control-label" for="inputPassword">�ܡ��룺</label>
                        <div class="controls">
                            <input type="password" id="pwd" name="pwd" tabindex="2">
                            <span class="help-inline"><a href="<?php echo $cfg_memberurl; ?>/resetpassword.php" target="_blank">��������?</a></span>
                        </div>
                    </div>                  
                    <div class="control-group control-pwd">
                        <label class="control-label" for="inputName">��֤�룺</label>
                        <div class="controls">
                            <input type="text" id="vdcode" name="vdcode" tabindex="3" size="4" style="text-transform:uppercase;" maxlength="4">
                            <span class="help-inline"><img id="vdimgck" align="absmiddle" onClick="this.src=this.src+\'?\'" style="cursor:pointer;margin-left:0px;text-transform:uppercase;" alt="�����壿�������" src="/include/vdimgck.php"/></span>
                        </div>
                    </div>                    
                    <div class="control-group">
                        <div class="controls">
                            <input id="submitcode" type="hidden" name="submit" value="f5033bc6">
                            <input type="hidden" id="formhash" name="formhash" value="luxuejian">
                            <button type="submit" class="btn lgn-btn" tabindex="4">��¼</button>
                            <a href="/member/index_do.php?fmdo=user&dopost=regnew" class="lgn-reg-btn">ע��</a>
                            
                      </div>
                    </div>
                </form>
                <!--<div class="login-info">��ݵ�¼��</div>
                <div class="login-kj"><a class="weibo-lgn" href="#" target="_blank">����΢���ʺŵ�¼</a><a class="qq-lgn" href="#" target="_blank">QQ�ʺŵ�¼</a></div>-->
            </div>
        </div>
    </div>