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
        <title>�ҵ��ղ� - <?php echo $cfg_webname; ?><</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
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
            <?php include $this->CompilerInclude("login_box.htm");
 ?>       
		<script src="/plus/mytag_js.php?aid=1" language="javascript"></script> 
           <div class="row-fluid-wrap-hx">
                <div class="center-container-hx">
                    <div class="clearfix row-fluid-hx"><div class="clearfix individual-center">
    <div class="center-ctr-wrap">
        <div class="center-ctr-box">
            <div class="individual-center-box">
                <div class="personal-wodeshoucang">
                    <div class="personal-wodeshoucang-list">

          
                        <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
                        <div class="personal-homepage-box">
                            <h4><a href="archives_do.php?dopost=viewArchives&aid=<?php echo $fields['aid']; ?>" target="_blank"><?php echo $fields['title']; ?></a></h4>
                            <div class="box-other">
                                �ղ�ʱ�䣺<time><?php echo MyDate('Y-m-d H:i', $fields['addtime']); ?></time>
                                <span class="comment-box"><i class="icon-comment"></i><a href="archives_do.php?dopost=viewArchives&aid=<?php echo $fields['aid']; ?>#odby" target="_blank"><script src="/plus/pls.php?aid=<?php echo $fields['aid']; ?>" language="javascript"></script></a></span>
                            </div>
                            <div class="article-summary"><?php echo $fields['description']; ?></div>
                            <div class="box-delete"><a href="archives_do.php?dopost=delStow&type=<?php echo $fields['type']; ?>&aid=<?php echo $fields['aid']; ?>" >ɾ��</a></div>
                        </div>
                        <?php
}
}?>
                        
                    </div>
                    <div class="clearfix pages">
                        <div class="pull-right pgs"></div>                    </div>
                </div>

            </div>

        </div>
    </div>
    <div class="side-container-hx">
	<script src="/plus/mytag_js.php?aid=2" language="javascript"></script>
    </div>
</div>
</div>
<script src="/plus/mytag_js.php?aid=3" language="javascript"></script>
</div>
</div>
</div>
<div id="append_parent"></div><div id="ajaxwaitid"></div>
<script src="/plus/mytag_js.php?aid=4" language="javascript"></script>

<!--<div style="display: none">
<script type="text/javascript">
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F324368ef52596457d064ca5db8c6618e' type='text/javascript'%3E%3C/script%3E"));
</script>
</div>-->
</body>
</html>