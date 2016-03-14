<?php
$z[0]=Array("field","",356,375);
$z[0][4]['name']="title";
$z[1]=Array("global","",376,402);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",451,480);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",528,586);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("global","",1157,1182);
$z[4][4]['name']="cfg_cmsurl";
$z[5]=Array("global","",1442,1468);
$z[5][4]['name']="cfg_cmspath";
$z[6]=Array("include","",1661,1696);
$z[6][4]['filename']="head.htm";
$z[7]=Array("arclist","\r\n            <div class=\"toutiao idx-toutiao\">\r\n            <h2><a href=\"[field:arcurl/]\">[field:fulltitle/]</a></h2>\r\n            <p>[field:description/]</p>\r\n            <div class=\"box-img\"><a href=\"[field:arcurl/]\"><img src=\"[field:litpic/]\"></a></div>\r\n            <div class=\"box-other\">\r\n                <span class=\"source-quote\"><a href=\"/member/index.php?uid=[field:mid runphp='yes']global \$dsql;\$sql='SELECT userid FROM dede_member WHERE mid='.@me;\$spaceurl = \$dsql->GetOne(\$sql);@me=\$spaceurl['userid'];[/field:mid]\" target=\"_blank\">[field:writer/]</a></span>\r\n                <time>[field:pubdate function=\"GetDateTimeMK(@me)\"/]</time>\r\n                <span class=\"comment-box\"><i class=\"icon-comment\"></i><a href=\"[field:arcurl/]#odby\" target=\"_blank\"><script src=\"/plus/pls.php?aid=[field:id/]\" language=\"javascript\"></script></a></span>\r\n                <span class=\"tags-box\">[field:id function=GetTags(@me)/]</span></div></div>\r\n                      \r\n      ",1942,2977);
$z[7][4]['flag']="h";
$z[7][4]['titlelen']="42";
$z[7][4]['row']="1";
$z[8]=Array("list","\r\n\r\n                <div class=\"clearfix article-box\">\r\n                <a href=\"[field:arcurl/]\" class=\"a-img\" target=\"_blank\"><img src=\"[field:litpic/]\"/></a>\r\n                <div class=\"article-box-ctt\">\r\n                    <h4><a href=\"[field:arcurl/]\" target=\"_blank\">[field:fulltitle/]</a></h4>\r\n                    <div class=\"box-other\">\r\n                        <span class=\"source-quote\"><a href=\"/member/index.php?uid=[field:mid runphp='yes']global \$dsql;\$sql='SELECT userid FROM dede_member WHERE mid='.@me;\$spaceurl = \$dsql->GetOne(\$sql);@me=\$spaceurl['userid'];[/field:mid]\" target=\"_blank\">[field:writer/]</a></span>\r\n                        <time>[field:pubdate function=\"GetDateTimeMK(@me)\"/]</time>\r\n                        <span class=\"comment-box\"><i class=\"icon-comment\"></i><a href=\"/plus/feedback.php?aid=[field:id/]\" target=\"_blank\"><script src=\"/plus/pls.php?aid=[field:id/]#odby\" language=\"javascript\"></script></a></span></div><div class=\"article-summary\">[field:description/]</div><p class=\"tags-box\">[field:id function=GetTags(@me)/]</p></div></div>\r\n                            \r\n    ",3023,4187);
$z[8][4]['pagesize']="10";
$z[8][4]['noflag']="h";
$z[9]=Array("pagelist","",4309,4387);
$z[9][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[9][4]['listsize']="5";
$z[10]=Array("include","",4512,4548);
$z[10][4]['filename']="right.htm";
$z[11]=Array("include","",4585,4622);
$z[11][4]['filename']="footer.htm";
$z[12]=Array("include","",4733,4769);
$z[12][4]['filename']="login.htm";

?>