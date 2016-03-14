<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><div class="author-lsit-menu">
                        <ul class="clearfix inline"><li><a href="index.php?uid=<?php echo $GLOBALS['_vars']['userid']; ?>&action=archives"  <?php if($action == "archives" || empty($action)) echo 'class="on"'; ?>>TA的文章<sup><?php
$mid = $_vars['mid'];$row = $dsql->GetOne("select count(id) from dede_archives where mid='$mid'");echo $row['count(id)'];
?></sup></a></li><li><a href="index.php?uid=<?php echo $GLOBALS['_vars']['userid']; ?>&action=comment"  <?php if($action == "comment") echo 'class="on"'; ?>>TA的评论<sup><?php
$mid = $_vars['mid'];$row = $dsql->GetOne("select count(id) from dede_feedback where mid='$mid'");echo $row['count(id)'];
?></sup></a></li>
                        <li><a href="index.php?uid=<?php echo $GLOBALS['_vars']['userid_e']; ?>&action=infos"  <?php if($action == "infos") echo 'class="on"'; ?>>TA的资料</a></li>
                        
                        <li><a href="index.php?uid=<?php echo $GLOBALS['_vars']['userid_e']; ?>&action=guestbook" <?php if($action == "guestbook") echo 'class="on"'; ?>>给TA留言<sup><?php
$mid = $_vars['mid'];$row = $dsql->GetOne("select count(aid) from dede_member_guestbook where mid='$mid'");echo $row['count(aid)'];
?></sup></a></li>                        
                        </ul>
                    </div>