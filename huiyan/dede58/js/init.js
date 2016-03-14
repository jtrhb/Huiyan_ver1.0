/**
var jQ = jQuery.noConflict();
**/
seajs.modify('jquery', function(require, exports) {
  window.jQuery = window.jQ = exports
})
seajs.modify('cookie', function(require, exports, module) {
  module.exports = jQ.cookie
})
var cookie_uid = 0;
define(function(require, exports){
	/**
	*	全站
	*	加载cookie模块
	**/
	var cookie = require('cookie');
	require('bootstrap');
	require('prettify');
	
	
	/**
	*	全站
	*	by jiantian
	*	time 2013.01.15
	*	判断是否登录
	**/
	if(jQ.cookie(cookiepre+'uid')!='0'&&jQ.cookie(cookiepre+'uid')!=null){
		cookie_uid=jQ.cookie(cookiepre+'uid');
		//cookie_uid='0';
	}
	jQ.cookie('count_article','1',{expires:259200}); 
	var count_article = jQ.cookie('count_article');
	if(count_article == '1' && count_article_id > 0 ){
	var article_id = 'count_article_'+count_article_id;
		if(jQ.cookie(article_id)!='1'){
			var article_url = '/tools/tongji.html?t='+(Math.random()*10000);
			jQ.post(article_url+'&aid='+count_article_id,function(){})
			jQ.cookie(article_id,'1',{expires:60*60*1000});
		}else{
		}
	}


	jQ("#start-intro").click(function(){
		bootstro.start();
	});
	
	/**
	*	boot左侧附加导航
	**/
	jQ('#navbar').affix();
	
	/**
	*	boot标记
	**/
	jQ('.a-reg').popover('toggle');
	
	/**
	*	全站登录
	**/
	if(jQ('#lgnModal').length>0){
		require('hx_login');
	}
	/**
	*	全站注销
	**/
	if(jQ('.logout-btn').length>0){
		logout()
	}

	/**
	*	如果未登录，首页订阅不可用
	**/
	if(jQ('.a-email').length>0){
		var email = jQ('.a-email')
		email.attr({'url':email.attr('href'),'href':'javascript:void(0);'});
		jQ(document).on('click','.a-email',function(){
			if (!isLogin()) {
				jQ('#lgnModal').modal('show');
			}else{
				location.href=email.attr('url');
			}
		})
		jQ(document).on('click','.app-ad-btn',function(){
			jQ(this).find('div').toggle();
			jQ(this).siblings().find('div').hide();
		})
	}
	
	/**
	*	登录浮动框
	**/
	if(jQ('.float-box').length>0){
		jQ('.close').live('click',function(){
			jQ(this).parents('.float-box').hide();
		})
	}

	
	/**
	*	加载读点js
	**/
	if(jQ('.slides-box').length>0){
		slibeBox('#slides');
		slibeBox('#slides2');
		slibeBox('#slides3');
		slibeBox('#slides4');
		
	}
	
	/**
	*	加载读点js
	**/
	if(jQ('.books-neirong').length>0){
		require('read');
	}
	
	/**
	*	加载内容页管理
	**/
	if(jQ('#position_wrap').length>0){
		
		
		jQ('.manage-box2').hover(function(){
			jQ(this).find('ul').height('auto')
		},function(){
			jQ(this).find('ul').height('0')
		})
				
		
		
		jQ(document).on('click','.ifrome-btn',function(){
			var url = jQ(this).attr('url')
				,w = jQ(this).attr('w')
				,h = jQ(this).attr('h')
				;
			if(jQ('#gl_set_iframe_wrap').length>0){
				jQ('#gl_set_iframe_wrap').remove();
			}
			/* zhong 20130713 添加弹出拖动 */
			jQ('body').append('<div id="gl_set_iframe_wrap" style="width:'+w+'px;height:'+h+'px;margin:'+(-h/2)+'px 0 0 '+(-w/2)+'px;"><h2 id="tuodong" >点击拖动</h2><i class="close">x</i><iframe id="gl_set_iframe" src="'+url+'"></iframe></div>')
			
			jQ('#gl_set_iframe_wrap .close').live('click',function(){
				jQ('#gl_set_iframe_wrap').remove();
			})
            var oWin = document.getElementById("gl_set_iframe_wrap");
            var oH2 = oWin.getElementsByTagName("h2")[0];
            var bDrag = false;
            var disX = disY = 0;
            oH2.onmousedown = function (event)
            {		
                var event = event || window.event;
                bDrag = true;
                disX = event.clientX - oWin.offsetLeft;
                disY = event.clientY - oWin.offsetTop;		
                this.setCapture && this.setCapture();		
                return false
            };
            document.onmousemove = function (event)
            {
                if (!bDrag) return;
                var event = event || window.event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
                var maxT = document.documentElement.clientHeight - oWin.offsetHeight;		
                iL = iL < 0 ? 0 : iL;
                iL = iL > maxL ? maxL : iL; 		
                iT = iT < 0 ? 0 : iT;
                iT = iT > maxT ? maxT : iT;

                oWin.style.marginTop = oWin.style.marginLeft = 0;
                oWin.style.left = iL + "px";
                oWin.style.top = iT + "px";		
                return false
            };
            document.onmouseup = window.onblur = oH2.onlosecapture = function ()
            {
                bDrag = false;				
                oH2.releaseCapture && oH2.releaseCapture();
            };
		})
	}
	
	/**
	*	加载名片js
	**/
	if(jQ('#body_books').length>0){
		require('hovercard.css');
		require('hoverCard');
	}
	
	/**
	*	加载热词js
	**/
	if(jQ('#reci_container').length>0){
		require('masonry');
		
		
		jQ('#reci_container').masonry({itemSelector : '.item'});
		
		function Arrow_Points(){
		  var s = jQ("#reci_container").find(".item");
		  jQ.each(s,function(i,obj){
			var posLeft = jQ(obj).css("left");
			if(posLeft == "0px"){
			  html = "<span class='rightCorner'></span>";
			  jQ(obj).prepend(html);
			} else {
			  html = "<span class='leftCorner'></span>";
			  jQ(obj).prepend(html);
			}
		  });
		}
		Arrow_Points();
	}
	
	/**
	*	加载评论js
	**/
	if(jQ('#pinglun').length>0){
		require('hx_pinglun');
	}
	/**
	*	内容增加超链
	**/
	if(jQ('#neirong_box').length>0){
		jQ('#neirong_box a:not(.a_self)').attr('target','_blank');
	}

	/**
	*	个人中心内所有删除动作和订阅添加
	*	见天
	*	5.7
	**/
	if(jQ('.individual-center-box,.author-page,.tags-all-list,#tags_list,.tags-nr-box').length>0){
		jQ(document).on('click','.box-delete a,.personal-dingyue .close-ico,.author-page .close-ico,.set-tags,.add-tag,.tags-dingyue',function(){
			var favid = jQ(this).attr('favid')
				,id = isUndefined(jQ(this).attr('id'))?'':jQ(this).attr('id')
				,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
				,tagid = isUndefined(jQ(this).attr('tagid'))?'':jQ(this).attr('tagid')
				,authorid = isUndefined(jQ(this).attr('authorid'))?'':jQ(this).attr('authorid')
				,opt = jQ(this).attr('opt')
				,act = jQ(this).attr('act')
				,postUrl = '/usersubmit?&is_ajax=1&random='
				,random = parseInt(Math.random()*100000)
				,formUrl = postUrl+random
				,postData = {'favid':favid,'id':id,'aid':aid,'tagid':tagid,'authorid':authorid,'opt':opt,'act':act}
				;
			jQ.post(formUrl,postData,function(data){
				var data = eval('(' + data + ')');
				if(data.is_success == '1') {
					alert(data.msg)
					jQ('#id_'+id).remove();
				}else{
					alert(data.msg)
				}
			})
			
		})
	}
	
	
	/**
	*	投稿判断投读书
	*	见天
	*	7.3
	**/
   	if(jQ('.tougao-msg').length>0){
		jQ('.tougao-class select').change(function(){
			var tougaoText = jQ(this).find('option:selected').text();
			if(tougaoText=='读点'){
				jQ('.book-dd').show();
				jQ('#dudiantougao').show();
				jQ('#wenzhangtougao').hide();
			}else{
				jQ('.book-dd').hide();
				jQ('#dudiantougao').hide();
				jQ('#wenzhangtougao').show();
			}
		})
   	}
	/**
	*	判断投递活动
	*	见天
	*	7.4
	**/
   	if(jQ('#toudihuodong').length>0){
		require('bootstrap-datetimepicker.min');
		require('datetimepicker.css');
   		
		jQ(".form_datetime").datetimepicker({
		    format: "yyyy-mm-dd hh:ii",
		    autoclose: true,
		    todayBtn: true,
		    startDate: "2013-07-01",
		    minuteStep: 10
		});
   	
   	}
	
	
	/**
	*	by jiantian
	*	time 2013.05.12
	*	分享
	**/
	if(jQ('#share_wrap').length>0||jQ('#pinglun_list').length>0){
		
		/**
		*	by jiantian
		*	time 2013.05.12
		*	分享数
		**/
		var share_num_url = '/tools/getsharenum.html?aid='
			,share_box = jQ('.side-share-box .pos-top')
			,share_num_id = share_box.find('i').attr('aid')
			;
		jQ.get(share_num_url+share_num_id,function(data){
			share_box.find('i').html(data);
		})
		
		
		jQ(document).on('click','.share-box li',function(){
			if(!jQ(this).hasClass('tools-qrcode')&&!jQ(this).hasClass('hxs-fontset')){
				var from_url = encodeURIComponent(document.location.href)
					,title = encodeURIComponent(preg_quote(document.title))
					,description = encodeURIComponent(preg_quote(jQ('meta[name="description"]').attr('content')))
					,des = jQ(this).attr('des')
					,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
					,pid = isUndefined(jQ(this).attr('pid'))?'':jQ(this).attr('pid')
					///*,url = '/huxiu.com/tools.php?new_page=1&mod=share'+'&des='+des+'&from_url='+from_url+'&title='+title+'&description='+description+'&pid='+pid+'&aid='+aid;*/
					,url = '/share_data?aid='+aid+'&des='+des+'&pid='+pid
					;
				window.open(url);
			}
		})
		jQ('#share_wrap .hxs-fontset').click(function(){
			var supBox = jQ(this).find('sup')
				,cttBox = jQ('#neirong_box')
				,cttBoxNum = parseInt(cttBox.css('font-size'));
			if(supBox.text()=='+'){
				cttBox.css({'font-size':cttBoxNum+2+'px','line-height':cttBoxNum+12+'px'});
				supBox.text('-')
			}else{
				cttBox.css({'font-size':cttBoxNum-2+'px','line-height':cttBoxNum+8+'px'});
				supBox.text('+')
			}
		})
		jQ('#share_wrap .tools-qrcode').click(function(){
			var box = jQ('#qrcode_box');
			if(box.length>0){
				if(box.is(':hidden')){
			        box.stop().show().animate({
			        	bottom:'55'
			        	,opacity:'1'
			        },'slow')
                }else{
			        box.stop().animate({
			        	bottom:'45'
			        	,opacity:'0.6'
			        },'slow',function(){
			        	jQ(this).hide();
			        })
                }
			}else{
            	var local_url = window.location.href
            		,qrcode_url = '/qr.html?data='+local_url
            		;
            	jQ.get(qrcode_url,function(data){
            		jQ('#share_wrap .tools-qrcode').append('<div id="qrcode_box">'+data+'</div>');
			        jQ('#qrcode_box').stop().show().animate({
			        	bottom:'55'
			        	,opacity:'1'
			        },'slow')
            	})
			}
		})
		jQ(document).on('click','.share-box .i-more',function(){
			jQ(this).parents('.share-box').siblings('.side-share-box2').toggle();
		})
		jQ(document).on('click','.pl-share',function(){
			jQ(this).find('.side-share-box2').toggle();
		})
		
	}
	
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.05.09
	*	提交建议
	**/
	if(jQ('#report_brn').length>0){
		jQ('#report_brn').click(function(){
			if(jQ('.float-report-box').length>0){
				jQ('.float-report-box').remove();
			}
			var offs = jQ(this).offset()
				,box = '<div class="float-box float-report-box" style="left:'+(offs.left-174)+'px;top:'+(offs.top-260)+'px"><h3>提交建议</h3><span class="close">x</span><div class="ctt-wrap"><form name="name" action="/usersubmit.html" method="get"><div class="box-ctt"><div class="textarea-book"><textarea maxlength="350"></textarea></div><div class="clearfix btn-box"><button type="button" class="pull-right btn">确定</button></div></div></form></div></div>'
				;
			jQ('body').append(box);
			jQ('.float-report-box form').submit(function(){return false;});
			
		})
	}
	if(jQ('#report_brn2').length>0){
		jQ('#report_brn2').click(function(){
			if(jQ('.float-report-box').length>0){
				jQ('.float-report-box').remove();
			}
			var offs = jQ(this).offset()
				,box = '<div class="float-box float-report-box" style="left:'+(offs.left-174)+'px;top:'+(offs.top+30)+'px"><h3>提交建议</h3><span class="close">x</span><div class="ctt-wrap"><form name="name" action="/usersubmit.html" method="get"><div class="box-ctt"><div class="textarea-book"><textarea maxlength="350"></textarea></div><div class="clearfix btn-box"><button type="button" class="pull-right btn">确定</button></div></div></form></div></div>'
				;
			jQ('body').append(box);
			jQ('.float-report-box form').submit(function(){return false;});
			
		})
	}
	jQ('.float-report-box .btn-box').live('click',function(){
		var url = location.href
			,postUrl = '/usersubmit.html?is_ajax=1&random='
			,random = parseInt(Math.random()*100000)
			,formUrl = postUrl+random
			,act = 'add_report'
			,message = encodeURI(jQ(this).parents('.float-report-box').find('textarea').val())
			,postData = {'url':url,'act':act,'message':message}
			;
		jQ.post(formUrl,postData,function(data){
			var data = eval('(' + data + ')');
			if(data.is_success == '1') {
				alert(data.msg)
				jQ('.float-report-box').remove();
			}else{
				alert(data.msg)
			}
		})
	})
	jQ('.float-report-box .close').live('click',function(){
		jQ('.float-report-box').remove();
	})
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.05.09
	*	个人中心，邮件，注册检测
	**/
	if(jQ('.reg-wrap').length>0){
		
		jQ('#inputEmail,#inputName').live('blur',function(){
			formCheck(jQ(this))
		})
		jQ('#inputPwd2').live('blur',function(){
			var pwd = jQ('#inputPwd')
				,pwd2 = jQ('#inputPwd2')
				;
			if(pwd2.val()==''){
				pwd.parents('.control-group').removeClass('success').addClass('error')
				pwd2.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('密码不能为空');
			}else if(pwd.val()==pwd2.val()){
				pwd.parents('.control-group').removeClass('error').addClass('success')
				pwd2.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('输入正确');
			}else{
				pwd.parents('.control-group').removeClass('success').addClass('error')
				pwd2.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('两次密码不一致');
			}
		})
		jQ('#phone').live('blur',function(){
			var phone = jQ('#phone')
				,mobile = /^1\d{10}$/
				;
			if(!mobile.test(phone.val())){
				phone.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('请填写手机号码');
			}else{
				phone.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('号码正确');
			}
		})
	}
	
	/**
	*	by jiantian
	*	time 2013.05.13
	*	个人中心修改资料检测
	**/
	if(jQ('.personal-data').length>0){
		
		jQ('#inputEmail,#inputName').live('blur',function(){
			formCheck(jQ(this),'/user/check/?is_ajax=1&random=')
		})
		jQ('#inputPwd3').live('blur',function(){
			var pwd2 = jQ('#inputPwd2')
				,pwd3 = jQ('#inputPwd3')
				;
			if(pwd3.val()==''){
				pwd2.parents('.control-group').removeClass('success').addClass('error')
				pwd3.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('密码不能为空');
			}else if(pwd2.val()==pwd3.val()){
				pwd2.parents('.control-group').removeClass('error').addClass('success')
				pwd3.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('输入正确');
			}else{
				pwd2.parents('.control-group').removeClass('success').addClass('error')
				pwd3.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('两次密码不一致');
			}
		})
		jQ('#inputphone').live('blur',function(){
			var phone = jQ('#inputphone')
				,mobile = /^1\d{10}$/
				;
			if(!mobile.test(phone.val())){
				phone.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('请填写手机号码');
			}else{
				phone.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('号码正确');
			}
		})
	}
	
	function formCheck(box,type){
		var message = jQ(box).val()
			,check = jQ(box).attr('name')
			,postUrl = isUndefined(type)?'/index.php?&is_ajax=1&random=':type
			,random = parseInt(Math.random()*100000)
			,formUrl = postUrl+random+'&check='+check
			,postData = {'value':message}
			;
		if(message!=''){
			jQ.post(formUrl,postData,function(data){
				var data = eval('(' + data + ')');
				if(data.is_success == '1') {
					jQ(box).parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html(data.msg);
				}else{
					jQ(box).parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html(data.msg);
				}
				box.popover('show');
			})
		}else{
			jQ(box).parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('输入框不能为空');
		}
	}
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.05.09
	*	用户协议
	**/
	if(jQ('#user_memo').length>0){
		jQ(document).on('click','.user-memo-btn',function(){
			if(jQ('#user_memo:hidden').length>0){
				jQ('#user_memo').show().animate({
					height: '260'
				}, 'slow');
			}else{
				jQ('#user_memo').animate({
					height: '0'
				}, 'slow',function(){
					jQ(this).hide()
				});
			}
		})
	}
	/**
	*	by jiantian
	*	time 2013.05.10
	*	复制到剪贴板的js代码
	**/
	jQ('.rss-wrap button').live('click',function(){
		var text = jQ(this).siblings('input').val();
		copy_code(text);
	})
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.06.06
	*	作者名片
	**/
	if(jQ('.author-weixin').length>0){
		jQ(document).on('click','.author-weixin',function(){
			jQ(this).find('.author-weixin-box').toggle();
		})
	}
	/**
	*	by jiantian
	*	time 2013.05.12
	*	订阅作者
	**/
	if(jQ('.dy-btn').length>0){
		jQ(document).on('click','.dy-btn',function(){
			var id = isUndefined(jQ(this).attr('id'))?'':jQ(this).attr('id')
				,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
				,tagid = isUndefined(jQ(this).attr('tagid'))?'':jQ(this).attr('tagid')
				,uid = isUndefined(jQ(this).attr('uid'))?'':jQ(this).attr('uid')
				,authorid = isUndefined(jQ(this).attr('authorid'))?'':jQ(this).attr('authorid')
				,opt = jQ(this).attr('opt')
				,act = jQ(this).attr('act')
				,postUrl = '/usersubmit?&is_ajax=1&random='
				,random = parseInt(Math.random()*100000)
				,formUrl = postUrl+random
				,postData = {'id':id,'aid':aid,'uid':uid,'tagid':tagid,'authorid':authorid,'opt':opt,'act':act}
			
			jQ.post(formUrl,postData,function(data){
				var data = eval('(' + data + ')');
				if(data.is_success == '1') {
					showDialog(data.msg,'notice','提示信息','','0','','','','','5','')
				}else{
					showDialog(data.msg,'notice','提示信息','','0','','','','','5','')
				}
			})
			
		})
	}
	
	/**
	*	by jiantian
	*	time 2013.06.22
	*	个人设置
	**/
	if(jQ('#year_m_d').length>0){
		if(data_y!=0){
			jQ('#year_m_d select[name="birthyear"] option[value='+data_y+']').attr('selected','selected');
		}
		if(data_m!=0){
			jQ('#year_m_d select[name="birthmonth"] option[value='+data_m+']').attr('selected','selected');
		}
		if(data_d!=0){
			jQ('#year_m_d select[name="birthday"] option[value='+data_d+']').attr('selected','selected');
		}
	}
	
})


		
/**
*	全站
*	绑定下拉菜单,滑动显示
**/
menuSlide('#user_login div','ul');
		
/**
*	全站
*	绑定分享菜单,滑动显示
**/
menuClickSlide('.book-share','.share-box');

/**
*	全站
*	by jiantian
*	time 2013.01.15
*	菜单滑动下拉显示
**/
function menuSlide(id,tags,timeout){
	var timeout = isUndefined(timeout) ? '800' : timeout;
	jQ(id).hover(function(){
		jQ(this).find(tags).stop(true,true).slideDown('fast');
	}, function() {
		jQ(this).find(tags).delay(timeout).slideUp(100);
	});
}

/**
*	全站
*	by jiantian
*	time 2013.01.15
*	菜单点击下拉显示
**/
function menuClickSlide(id,tags){
	var box = jQ(id).find(tags);
	jQ(document).on('click',id,function(){
		if(box.is(':hidden')){
			box.stop(true,true).slideDown('fast');
		}else{
			box.stop(true,true).slideUp(100);
		}
	});
}

/**
*	全站
*	by jiantian
*	time 2013.05.22
*	定义$符号
**/
function $(id) {
	return !id ? null : document.getElementById(id);
}


/**
*	全站
*	by jiantian
*	time 2013.01.15
*	判断是否定义
*	加载common的时候不需要
**/
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

/**
*	全站
*	by jiantian
*	time 2013.01.15
*	判断是否登录
**/
function isLogin(){
	var uid = isUndefined(uid)?'0':uid;
	if(cookie_uid!='0'){
		return true;
	}else if(uid!='0'){
		return true;
	}else{
		return false;
	}
}


/**
*	by jiantian
*	time 2013.05.07
*	读点的滚动数据
**/
function slibeBox(id) {
	var ul_box = jQ(id).find('.slides-div ul'),
		ul_num = ul_box.length,
		li_wrap = jQ(id).find('.slides-pagination'),
		li_box='',
		pre = jQ(id).find('.pre'),
		next = jQ(id).find('.next'),
		li_btn = ul_box.find('a'),
		slibe_w = jQ(id).find('.slides-div').width(),
		cur_i = '0';
	
	for(i=1;i<=ul_num;i++){
		if(i=='1'){
			li_box = '<li><a href="javascrpit:void(0)" class="on">'+i+'</a></li>'
		}else{
			li_box += '<li><a href="javascrpit:void(0)">'+i+'</a></li>';
		}
		li_wrap.html(li_box);
	}
	li_wrap.find('a').live('click',function(){
		var t_num = jQ(this).text()-1;
		
			if(t_num>cur_i){
				moveBox(ul_box,-slibe_w,cur_i,t_num,li_wrap,pre)
				cur_i = t_num;
				if(cur_i==(ul_num-1)){
					next.addClass('on');
				}
			}else if(t_num<cur_i){
				moveBox(ul_box,slibe_w,cur_i,t_num,li_wrap,next)
				cur_i = t_num;
				if(cur_i=='0'){
					pre.addClass('on');
				}
			}
		
	})
	pre.live('click',function(){
		if(cur_i!='0'){
			moveBox(ul_box,slibe_w,cur_i,--cur_i,li_wrap,next)
			if(cur_i=='0'){
				pre.addClass('on');
			}
		}
	})
	next.live('click',function(){
		if(cur_i<(ul_num-1)){
			moveBox(ul_box,-slibe_w,cur_i,++cur_i,li_wrap,pre)
			if(cur_i==(ul_num-1)){
				next.addClass('on');
			}
		}
	})
	
	function moveBox(ul_box,slibe_w,cur_i,cur_i2,li_wrap,tbox) {
			ul_box.eq(cur_i).animate({left:slibe_w},1000);
			ul_box.eq(cur_i2).animate({left:0},1000).addClass('on').siblings().removeClass('on');
			li_wrap.find('a').removeClass('on').eq(cur_i2).addClass('on');
			tbox.removeClass('on');
	}
}


/**
*	全站错误提示
**/
function errorBox(){
	var boxWrap = '<div id="box_wrap"></div>'
}


	
/**
*	by jiantian
*	time 2013.05.09
*	退出登录
**/
function logout(){
	var logout_url = jQ('.logout-btn').attr('url');
	jQ('.logout-btn').attr('href','javascript:void(0);');
	jQ('.logout-btn').live('click',function(){
	    var	random = parseInt(Math.random()*100000)
	    	,uUrl = logout_url+'?is_ajax=1&back=?&random='+random
			;
		jQ.post(uUrl,function(data){
			var data = eval('(' + data + ')');
			if(data.is_success=='1'){
				jQ('.login-box').before('<div class="login-box"><div class="btn-group"><a href="/contribute" class="contribute" title="投稿">投稿</a></div><div class="btn-group"><a href="#lgnModal" data-toggle="modal">登录</a><a href="/user.huxiu.com/index.php?m=register">注册</a></div><div class="btn-group"><a href="/rss" title="RSS"><i class="icon-rss"></i></a></div></div>').remove();
				window.location.reload();
			}
		})
	})
}




/**
*	by jiantian
*	time 2013.05.10
*	跟随浮动
**/
if(jQ('.go-top').length>0){
	floatBox('.go-top','','300','right','10','none')
}
if(jQ('#position_wrap').length>0){
	floatBox('#position_wrap','','0','right','70','none')
}
if(jQ('#share_wrap').length>0){
	floatBox('#share_wrap','.neirong','700')
}
function floatBox(id,wrap,top,right,bottom,dis){
	var box = jQ(id)
		,top = isUndefined(top)?'0':top
		,bottom = isUndefined(bottom)?'0':bottom
		,wrapNum = '1000000'
		,right = isUndefined(right)?'0':right
		,dis = isUndefined(dis)?'block':dis
		;

	if(!isUndefined(wrap)&&wrap!=''){
		var wrapBox = jQ(wrap)
			,wrapH = wrapBox.height()
			,wOffs = wrapBox.offset();
		var wrapNum = wrapH+wOffs.top-66;
	}
	if(dis=='none'){box.hide();}
	if(right!='0'){
		var winWth = jQ(window).width();
		var boxWth = jQ('.row-fluid-wrap-hx').width();
		if((winWth-boxWth) >= 20){
			var rNum = (winWth-boxWth)/2-box.width();
		}else{
			var rNum = '10px';
		}
		box.css({'right':rNum})
	}

    jQ(window).scroll(function() {
		var scrolls = jQ(this).scrollTop()+jQ(window).height()-60;
		if (scrolls > top && scrolls < wrapNum) {
			if (window.XMLHttpRequest) {
				box.css({
                    position: 'fixed',
                    bottom: bottom+'px',
			    	display:'block'
				});
			} else {
				box.css({
                    position: 'absolute',
					top: scrolls-bottom+'px',
			    	display:'block'
				});
			}
		}else {
			box.css({
			    position: 'relative',
			    display:dis
			})
		}
    })
}

/**
*	by jiantian
*	time 2013.05.10
*	复制到剪贴板的js代码
**/
function preg_quote(str) {
    return str.replace(/(["'"])/g, "`");
}


/**
*	by jiantian
*	time 2013.05.10
*	复制到剪贴板的js代码
**/
function copy_code(copyText) 
{
    if (window.clipboardData) 
    {
        window.clipboardData.setData("Text", copyText)
    } 
    else 
    {
        var flashcopier = 'flashcopier';
        if(!document.getElementById(flashcopier)) 
        {
          var divholder = document.createElement('div');
          divholder.id = flashcopier;
          document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        var divinfo = '<embed src="/dede58/img/_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(copyText)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
    }
  alert('copy成功！');
}


/**
*	by jiantian
*	time 2013.05.23
*	格式化对象为json数据
**/
function parseFunction(data){
	
	var vdata='';
	
	jQ.each(data,function(i,v){
		vdata = vdata+'"'+i+'":'+v+','
	})
	vdata = '{'+vdata+'}';
	
	return vdata;
}

/**
*	by jiantian
*	time 2013.05.23
*	更新cookie数据
**/
function updataCookie(aid,clickid){
	var hxwz_uid = 'hxwz_'+uid,hxwz_aid = eval('('+jQ.cookie(hxwz_uid) + ')'),flag=0;
	var temp_click = Math.pow(2,clickid-1);
	jQ.each(hxwz_aid,function(id,v){
		if(id==aid && (v & temp_click)==0){
			flag=1;
			v+=temp_click;
			hxwz_aid[aid] = v;
			return false;
		}
	})
	
	if(flag==0){
		hxwz_aid[aid] = temp_click;
	}
	var vdata = parseFunction(hxwz_aid);
	jQ.cookie(hxwz_uid,vdata,{expires:4592000})
}
