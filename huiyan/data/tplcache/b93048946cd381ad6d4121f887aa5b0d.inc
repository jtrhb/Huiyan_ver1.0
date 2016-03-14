{dede:sppage sptype='full' sptype='full' srul='1' erul='5'}{/dede:sppage}
{dede:previewurl}http://www.huxiu.com/article/40405/1.html{/dede:previewurl}
{dede:keywordtrim}{/dede:keywordtrim}
{dede:descriptiontrim}{/dede:descriptiontrim}
{dede:item field='title' value='' isunit='' isdown=''}
   {dede:match}<div class="subtitle-h1">[ÄÚÈİ]</div>{/dede:match}
   
   {dede:function}{/dede:function}
{/dede:item}
{dede:item field='writer' value='' isunit='' isdown=''}
   {dede:match}{/dede:match}
   
   {dede:function}{/dede:function}
{/dede:item}
{dede:item field='source' value='' isunit='' isdown=''}
   {dede:match}{/dede:match}
   
   {dede:function}{/dede:function}
{/dede:item}
{dede:item field='pubdate' value='' isunit='' isdown=''}
   {dede:match}{/dede:match}
   
   {dede:function}@me=GetMkTime(@me);{/dede:function}
{/dede:item}
{dede:item field='body' value='' isunit='1' isdown='1'}
   {dede:match}<div class="neirong-box" id="neirong_box">[ÄÚÈİ]<div class="clearfix pages">{/dede:match}
   {dede:trim}<a(.*)>{/dede:trim}
{dede:trim}</a>{/dede:trim}
{dede:trim}<tbody(.*)>{/dede:trim}
{dede:trim}</tbody>{/dede:trim}
{dede:trim}<table(.*)>{/dede:trim}
{dede:trim}</table>{/dede:trim}
{dede:trim}<tr(.*)>{/dede:trim}
{dede:trim}</tr>{/dede:trim}
{dede:trim}<td(.*)>{/dede:trim}
{dede:trim}</td>{/dede:trim}
   {dede:function}{/dede:function}
{/dede:item}
