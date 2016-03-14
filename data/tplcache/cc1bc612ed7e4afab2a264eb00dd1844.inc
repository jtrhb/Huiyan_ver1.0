<div class="clearfix article-box ">
                <a href="[field:arcurl/]" class="a-img" target="_blank"><img src="[field:litpic/]" width="220" height="146"/></a>
                <div class="article-box-ctt">
                    <h4><a href="[field:arcurl/]" target="_blank">[field:fulltitle/]</a></h4>
                    <div class="box-other">
                        <!--
                        <span class="source-quote">[field:writer/]</span>
                        <time>[field:pubdate function="GetDateTimeMK(@me)"/]</time></div><div class="article-summary">[field:description/]</div><p class="tags-box">[field:id function=GetTags(@me)/]<i class="i-icon-bottom"></i></p></div><div class="idx-hldj"><div class="article-icon"><span class="comment-box"><i class="icon-comment"></i><a href="[field:arcurl/]#odby" target="_blank"><script src="/plus/pls.php?aid=[field:id/]" language="javascript"></script></a></span></div></div></div>    
                       -->
                        <span class="source-quote"><a href="/member/index.php?uid=[field:mid runphp='yes']global $dsql;$sql='SELECT userid FROM dede_member WHERE mid='.@me;$spaceurl = $dsql->GetOne($sql);@me=$spaceurl['userid'];[/field:mid]" target="_blank">[field:writer/]</a></span>
                        <time>[field:pubdate function="GetDateTimeMK(@me)"/]</time>
                        <span class="comment-box"><i class="icon-comment"></i><a href="/plus/feedback.php?aid=[field:id/]" target="_blank"><script src="/plus/pls.php?aid=[field:id/]#odby" language="javascript"></script></a></span></div><div class="article-summary">[field:description/]</div><p class="tags-box">[field:id function=GetTags(@me)/]</p></div></div>