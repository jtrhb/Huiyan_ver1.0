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
        <title><?php echo $GLOBALS['_vars']['spacename'];  echo $GLOBALS['_vars']['curtitle']; ?></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="author" content="<?php echo $GLOBALS['_vars']['uname']; ?>"/>
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
                    
<?php
$atts = array();
$atts['tagname'] = 'spacenewart';
$atts['row'] = '10';
$atts['titlelen'] = '60';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{
?>

                    <div class="personal-homepage-box">
                        <h4><a href="<?php echo $fields['arcurl']; ?>" target="_blank"><?php echo $fields['title']; ?></a></h4>
                        <div class="box-other">
                            <span class="source-quote"><a href="#" target="_blank"><?php echo $GLOBALS['_vars']['uname']; ?></a></span>
                            <time><?php echo MyDate('Y-m-d h:i',$fields['pubdate']); ?></time>
                            <span class="comment-box"><i class="icon-comment"></i><a href="<?php echo $GLOBALS['cfg_phpurl']; ?>/feedback.php?aid=<?php echo $fields['id']; ?>" target="_blank"><?php echo $fields['scores']; ?></a></span>
                        </div>
                        <div class="article-summary">@<?php echo $GLOBALS['_vars']['uname']; ?> ：<?php echo $fields['description']; ?></div>
                    </div>
<?php
}
}
?>

</div>
            <div class="clearfix pages">
                <div class="pull-right pgs"><a href="index.php?uid=<?php echo $GLOBALS['_vars']['userid_e']; ?>&action=archives"><b>更多内容</b></a></div>            </div>
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