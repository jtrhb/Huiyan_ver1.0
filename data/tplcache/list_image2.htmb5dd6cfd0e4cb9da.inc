<?php
$z[0]=Array("field","",358,377);
$z[0][4]['name']="title";
$z[1]=Array("global","",378,404);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",525,554);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",602,660);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",1287,1322);
$z[4][4]['filename']="head.htm";
$z[5]=Array("list","\r\n                \r\n<dl>\r\n                    <dt><a href=\"[field:arcurl/]\">[field:title/]</a></dt>\r\n                    <dd>\r\n                        <p>\r\n                            <span class=\"source-quote\"><a href=\"/member/index.php?uid=[field:mid runphp='yes']global \$dsql;\$sql='SELECT userid FROM dede_member WHERE mid='.@me;\$spaceurl = \$dsql->GetOne(\$sql);@me=\$spaceurl['userid'];[/field:mid]\" target=\"_blank\">[field:writer/]</a></span>\r\n                            <time>[field:pubdate function=\"GetDateMK(@me)\"/]</time>\r\n                            <span class=\"comment-box\"><i class=\"icon-comment\"></i><a href=\"[field:arcurl/]\" target=\"_blank\"><script src=\"/plus/pls.php?aid=[field:id/]\" language=\"javascript\"></script></a></span>\r\n                        </p>\r\n                        <div class=\"box-img\"><a href=\"[field:arcurl/]\"><img src=\"[field:litpic/]\"></a></div>\r\n                    </dd>\r\n                </dl>\r\n                                \r\n          ",1611,2635);
$z[5][4]['pagesize']="1";
$z[5][4]['noflag']="h";
$z[6]=Array("pagelist","",2758,2836);
$z[6][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[6][4]['listsize']="5";

?>