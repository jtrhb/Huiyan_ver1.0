/****资料卡***/
/********无服务器时，测试使用********/
var strHtml='';
strHtml+='<div class="bm_hover_card_content udline">';
strHtml+='<div class="bm_hover_card_avator"><a href="/weibo.com/samnous"><img src="images/my_avatar.jpg" height="50" width="50" /></a></div>';
strHtml+='<div class="bm_hover_card_name"><a href="/weibo.com/samnous">Jamin-IT</a><img src="images/transparent.gif" class="male" height="14" width="14" /></div>';
strHtml+='<div class="bm_hover_card_from"><span>北京</span><span>朝阳区</span></div>';
strHtml+='<div class="bm_hover_card_signaure">俄罗斯方块告诉我们，犯了错误会...</div>';
strHtml+='<div class="clear"></div>';
strHtml+='<div class="bm_hover_card_info">';
strHtml+='	<p><a href="/meego123.net">关注</a><a href="/meego123.net">粉丝</a><a href="/meego123.net">分享</a></p>';
strHtml+='    <p><span>1</span><span>12</span><span>1234</span></p>';
strHtml+='</div>';
strHtml+='</div>';
strHtml+='<div class="bm_hover_card_bar"><a href="/meego123.net" class="add_followed"></a></div>';
/********以上测试使用********/


jQ(function(){
	bindHoverCard('.hx_user');
});
function bindHoverCard(fun) {
    var isHover = false;
    var showHoverCard,removeHoverCard,CurrentCard;
	var selector=jQ(fun);//要绑定的对象
	
    selector.die("mouseover").live("mouseover", function () {
        if (CurrentCard) CurrentCard.remove();
        if (removeHoverCard) clearTimeout(removeHoverCard);
        if (showHoverCard) clearTimeout(showHoverCard);
		//显示名片
        showHoverCard = setTimeout(hoverCardBuilder(jQ(this)), 108000);
    });
    selector.die("mouseout").live("mouseout", function () {
        if (!isHover) {
            clearTimeout(showHoverCard);
        } else if(CurrentCard) {
			removeCard();
			CurrentCard.hover(function () {
				clearTimeout(removeHoverCard);
			}, function () {
				removeCard();
			});
        }
        isHover = false;
    });
	//删除名片
	removeCard=function(timer){
		removeHoverCard = setTimeout(function () { CurrentCard.remove() }, timer||600);
	}
	//构建名片DOM
	hoverCardBuilder=function (hoverObject) {
		if (!isHover) {
			isHover = true;
			var hoverTop = '',hoverTopClass='';
			console.log(hoverObject.offset().top-jQ(document).scrollTop());
			if(hoverObject.offset().top-jQ('body').scrollTop()>='250'){
				hoverTop = hoverObject.offset().top - 220;
				hoverTopClass = 'bm_hover_card_arrow2';
			}else{
				hoverTop = hoverObject.offset().top + hoverObject.height()+8;
				hoverTopClass = 'bm_hover_card_arrow';
			}
			var bmHoverCard = jQ("<div>").addClass("bm_hover_card").css({ 
														top: hoverTop,
														left: hoverObject.offset().left-104+ hoverObject.width()/2});
			var bmHoverCardArrow = jQ("<div>").addClass(hoverTopClass);
			var bmHoverCardBorder = jQ("<div>").addClass("bm_hover_card_border");
			var bmLoading = jQ("<img>").attr({ "border": "0", "src": "images/transparent.gif" }).addClass("loading")
			var bmHoverCardBefore = jQ("<div>").addClass("bm_hover_card_before");
			var bmHoverCardContainer = jQ("<div>").addClass("bm_hover_card_container").html(bmHoverCardBefore);
			bmHoverCard.append(bmHoverCardArrow).append(bmHoverCardBorder).append(bmHoverCardContainer);				
			/**插入DOM**/
			jQ("body").prepend(bmHoverCard);
			
			CurrentCard=jQ(".bm_hover_card");

			/**获取数据
			*hx_user_id为用户id，用于查询用户信息
			**/
			if (hoverObject.attr("hx_user_id")) {
				bmHoverCardContainer.html(strHtml);
				/*
				*ajax动态获取用户信息
				jQ.ajax({
					url:"./hoverCard.html",
					type:"get",
					data:{id:hoverObject.attr("hx_user_id")},
					dataType:"html",
					timeout:8000,
					beforeSend:function(){
						bmHoverCardBefore.html(bmLoading);
					},
					success:function(data){
						bmHoverCardContainer.html(data);
					},
					error:function(){
						bmHoverCardBefore.html("读取错误");
					}
				});*/
			} else {
				bmHoverCardBefore.html("缺少查询参数");
			}
		}
	}
};
