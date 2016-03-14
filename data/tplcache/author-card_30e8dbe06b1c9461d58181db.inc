<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><div class="clearfix author-card">
    <div class="pull-left author-card-img">
        <p><?php if($_vars['face']==''){ ?> <img src="space/person/common/images/noavatar.gif" alt="<?php echo $row['uname']; ?>还没设置头像" /> <?php
}
else{
?> <img src="<?php echo $GLOBALS['_vars']['face']; ?>" alt="<?php echo $GLOBALS['_vars']['uname']; ?>的头像" /> <?php } ?></p>
    </div>
    <div class="author-card-box">
        <p class="card-name"><span class="name"><?php echo $GLOBALS['_vars']['uname']; ?> </span>
            <a href="index.php?uid=<?php echo $GLOBALS['_vars']['userid']; ?>&action=archives" class="article-num">文章<em>(<?php
$mid = $_vars['mid'];$row = $dsql->GetOne("select count(id) from dede_archives where mid='$mid'");echo $row['count(id)'];
?>)</em></a>
            <a href="#" >空间被访问(<?php echo $GLOBALS['_vars']['homecount']; ?>)</em></a></p>
        <p class="yijuhua"><?php
$mid = $_vars['mid'];$row = $dsql->GetOne("select sign from dede_member_space where mid='$mid'");echo $row['sign'];
?></p>        <div class="div-btn">
                        <a href="index.php?action=guestbook&uid=<?php echo $GLOBALS['_vars']['userid']; ?>" class="dy-btn">给我留言</a>
<a href="pm.php?dopost=send&uid=<?php echo $GLOBALS['_vars']['userid']; ?>" class="dy-btn"><span>发送消息</span></a>
         </div>
    </div>
    <i class="i-jiao"></i>
</div>