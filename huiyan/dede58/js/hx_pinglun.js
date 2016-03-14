define(function(require, exports){
	var atUrl = '/tools/atlist.html?f=100&back=?&f=100&random=';
	var showMsgId = '#textarea';
	var postUrl = '/usersubmit.html?is_ajax=1&random=';
	var plStart = '1';
	
    /**
	*	by jiantian
	*    禁用表单
	**/
    jQ('.pinglun form').submit(function(){return false;});
    
	jQ(showMsgId).keyup(function(){
		//定义最少输入数字
		var min=10;
			not_state = '1';
		//取得用户输入的字符的长度
		var length = jQ(this).val().length;
		if(length<min){
			jQ("#notice").html("最少输入<span id='notice_span'>"+(min-length)+"</span>个字");
		}else{
			jQ("#notice").html("您可以发布了");
		}
	})
	
    //@用户
	require('jquery.caret')
	require('jquery.atwho');
    var random = parseInt(Math.random()*100000);
    jQ.getJSON(atUrl + random, function (data) {
        datas = jQ.map(data, function (value, i) {
            return {'id':i, 'key':value, 'name':value}
        })
        atFind(datas);
    })
    
	/**
	*	字体大小设置
	**/
	if(jQ('#font_big').length>0){
		jQ(document).on('click','#font_big,#font_small',function(){
			var cttBox = jQ('#neirong_box');
			if(jQ(this).attr('id')=='font_big'){
				if(cttBox.css('font-size')=='14px'){
					cttBox.css({'font-size':'16px','line-height':'26px'});
				}else if(cttBox.css('font-size')=='16px'){
					cttBox.css({'font-size':'18px','line-height':'28px'});
				}
			}else{
				if(cttBox.css('font-size')=='16px'){
					cttBox.css({'font-size':'14px','line-height':'24px'})
				}else if(cttBox.css('font-size')=='18px'){
					cttBox.css({'font-size':'16px','line-height':'26px'})
				}
				
			}
			jQ(this).addClass('noclose').siblings().removeClass('noclose');
		})
	}
	
	/**
	*	textarea自动高度
	**/
	require('autoresize.min')
	jQ('#pinglun_list .textarea-txt').autoResize({
	    onResize : function() {
	        jQ(this).css({opacity:0.8});
	    },
	    animateCallback : function() {
	        jQ(this).css({opacity:1});
	    },
	    animateDuration : 300,
	    extraSpace : 30,
		limit: 150
	});
	
	/**
	*	model_weiboshare
	**/
	if(jQ('#loginpeople').length>0){
		require('/h1.51youwei.com/hbzxrec/js/common/huxiu.js')
	}
	
    //提交评论和点评
    jQ('.subscribe-btn').live('click',function () {
	    if (isLogin()) {
	        //评论
	        if(plStart=='1'){
		        var box = jQ(this).parents('form')
		        	,boxTextarea = box.find('.textarea-txt')
		        	,random = parseInt(Math.random()*100000)
		        	,formUrl = postUrl+random
		        	,boxDataMsg = isUndefined(boxTextarea.data('msg'))?'':boxTextarea.data('msg')
		        	,formMsg = boxTextarea.val()+boxDataMsg
		        	,action = box.find('input[name="act"]').val()
		        	,idtype = box.find('input[name="idtype"]').val()
		        	,aid = box.find('input[name="aid"]').val()
		        	,pid = box.find('input[name="pid"]').val()
		        	,t = jQ(this);
		        //内容不能为空
		        if(formMsg==''||formMsg==null){
		        	var formBox = t.parents('form')
		        		,textareaBox = formBox.find('.textarea-txt').parent()
		        		,boxHtml = '<div class="error-box" style="position:absolute;margin:0 auto;top:0;right:100px;color:#f00;width:200px;">亲，内容为空你好意思么</div>'
		        		;
		        	t.after(boxHtml).parent().css({'position':'relative'});
		        	formBox.find('.textarea-txt').css({'background-color':'#fdf4eb'});
		        	textareaBox.stop(true,true)
		        		.animate({'right':'10px'},100)
						.animate({'right':'-10px'},100)
		        		.animate({'right':'7px'},90)
						.animate({'right':'-7px'},90)
		        		.animate({'right':'4px'},80)
						.animate({'right':'-4px'},80)
						.animate({'right':'0'},70,function(){
		        			formBox.find('.textarea-txt').css({'background-color':'#fff'});
		        			formBox.find('.error-box').remove();
						});
		        	return false;
		        }
		        //提交表单
		        pinglunPost(formUrl,formMsg,action,idtype,aid,pid)
		        //关闭提交
		        plStart='0';
	        }
	        
	    } else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    }
    })
    
    //点评回复
    
	if(!isLogin()){
		jQ(document).on('click','#pinglun_list .textarea-txt',function(){
			jQ('#lgnModal').modal('show');
		})
	}
    
    
    jQ('.pinglun-reply-btn').live('click',function(){
		if(isLogin()) {
	    	//获取要回复用户名和内容
	    	var name = jQ(this).parents('.dianping-box-text').find('.name').text()
	    		,msg = jQ(this).parents('.dianping-box-text').find('.dd-s').text()
	    		,box = jQ(this).parents('.dianping-list').find('.textarea-txt').focus();
	    	//过滤msg代码保证只引用一条
	    	msg = htmlGroup(msg);
	    	//存储要回复的用户名并写入输入框
	    	box.data({'name':name,'msg':'//@'+msg}).val('回复@'+name+' ：').focus();
    	}else{
			jQ('#lgnModal').modal('show');
    	}
    })
    
    
	//提交顶踩
    jQ('.agree,.disagree').live('click',function () {
	    if (isLogin()) {
			if(!jQ(this).hasClass('is-clicked')){
				var t = jQ(this)
					,box = jQ(this).parents('.pinglun-box')
					,random = parseInt(Math.random()*100000)
					,formUrl = postUrl+random+'&act=add_click&opt=pid'
					,aid = box.find('input[name="aid"]').val()
					,pid = box.find('input[name="pid"]').val()
					,clickid='';
				if(jQ(this).hasClass('agree')){
					clickid = 0;
				}else if(jQ(this).hasClass('disagree')){
					clickid = 1;
				}
				var postData = {'clickid':clickid,'aid':aid,'pid':pid};
				jQ.post(formUrl,postData,function(data){
					var data = eval('(' + data + ')');
					if (data.is_success == "0") {
						if(data.uid=='0'){
							jQ('#lgnModal').modal('show');
						}
						alert(data.msg)
						//要改啊
						//showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					} else {
						agreeDisagree(t, '+1', '1');
						var t_span =t.find('span'),t_num = t_span.text();
						if(t_num==''){
							t_span.html('(1)');
						}else{
							t_num = t_num.replace('(','');
							t_num = parseInt(t_num.replace(')',''));
							t_span.html('('+(t_num+1)+')');
						}
					}
					t.addClass('is-clicked')
				})
			}
	    	
	    }else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    	
	    }
    })
	
    
    
    /**
	*	全站
	*	by jiantian
	*	time 2013.05.23
	*	判断顶踩
	**/
	if (isLogin()) {
		var hxwz_uid = 'hxwz_'+uid;
		if(!jQ.cookie(hxwz_uid)){
			var hxwzUrl = '/tools/getuserdata.html?is_ajax=1&random='
	        	,random = parseInt(Math.random()*100000)
	        	,hxwzUrl = hxwzUrl+random
		        ;
			jQ.get(hxwzUrl,function(data){
				data = eval('(' + data + ')'),
				vdata = parseFunction(data.aid);
				jQ.cookie(hxwz_uid,vdata,{expires:4592000})
				
				jQ.each(data.aid,function(id,v){
					if(id==count_article_id){
						if((v & 1) > 0){
							jQ('#nolike').addClass('is-clicked');
						}
						if((v & 2) > 0){
							jQ('#like').addClass('is-clicked');
						}
						if((v & 4) >0){
							jQ('#favorite').addClass('is-clicked');
						}
					}
				})
			})
		}else{
			var hxwz_aid = eval('('+jQ.cookie(hxwz_uid) + ')');
			jQ.each(hxwz_aid,function(id,v){
				if(id==count_article_id){
					if((v & 1) > 0){
						jQ('#nolike').addClass('is-clicked');
					}
					if((v & 2) > 0){
						jQ('#like').addClass('is-clicked');
					}
					if((v & 4) >0){
						jQ('#favorite').addClass('is-clicked');
					}
				}
			})
		}
	}
	//喜欢，没劲
    jQ('#like,#nolike').live('click',function () {
	    if (isLogin()) {
			if(!jQ(this).hasClass('is-clicked')){
				var t = jQ(this)
					,box = jQ(this).parents('.position-box')
					,random = parseInt(Math.random()*100000)
					,formUrl = postUrl+random+'&act=add_click&opt=aid'
					,aid = t.attr('aid')
					,clickid='';
				if(jQ(this).attr('title')=='喜欢'){
					clickid = 2;
				}else if(jQ(this).attr('title')=='没劲'){
					clickid = 1;
				}
				var postData = {'clickid':clickid,'aid':aid};
				jQ.post(formUrl,postData,function(data){
					var data = eval('(' + data + ')');
					if (data.is_success == '0') {
						showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					} else {
						var t_num = t.text();
						if(t_num==''){
							t.html('1');
						}else{
							t.html(parseInt(t_num)+1);
						}
						agreeDisagree(t, '+1', '1');
						t.addClass('is-clicked')
						updataCookie(aid,clickid);
					}
				})
			}else{
				//alert('已经提交过了');
				//要改啊
				showDialog('已经提交过了','notice','提示信息','','0','','','','','3','')
			}
	    	
	    }else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    	
	    }
    })
	//收藏
    jQ('#favorite').live('click',function () {
	    if (isLogin()) {
			if(!jQ(this).hasClass('is-clicked')){
				var t = jQ(this)
					,box = jQ(this).parents('.position-box')
					,random = parseInt(Math.random()*100000)
					,formUrl = postUrl+random+'&act=add_favorite&opt=aid'
					,aid = t.attr('aid')
					,message='';
				var postData = {'aid':aid,'message':message};
				jQ.post(formUrl,postData,function(data){
					var data = eval('(' + data + ')');
					if (data.is_success == "0") {
						//alert(data.msg);
						//要改啊
						showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					}else {
						var t_num = t.text();
						if(t_num==''){
							t.html('1');
						}else{
							t.html(parseInt(t_num)+1);
						}
						agreeDisagree(t, '+1', '1');
						//showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
						t.addClass('is-clicked')
						updataCookie(aid,4);
					}
				})
			}else{
				//alert('已经提交过了');
				//要改啊
				showDialog('已经提交过了','notice','提示信息','','0','','','','','3','')
			}
	    	
	    }else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    	
	    }
    })
	
    
	//删除评论和点评,推荐
    jQ('.view-delete-btn,.view-del-btn,.view-recommend-btn').live('click',function () {
    	var box = jQ(this).parents('.pinglun-box')
        	,action = ''
        	,random = parseInt(Math.random()*100000)
        	,formUrl = postUrl+random
        	,idtype = box.find('input[name="idtype"]').val()
        	,aid = box.find('input[name="aid"]').val()
        	,pid = box.find('input[name="pid"]').val()
        	,reppid = isUndefined(jQ(this).attr('reppid'))?'':jQ(this).attr('reppid')
    		;
    	if(reppid==''){
    		action = jQ(this).attr('action');
    	}else{
    		action = 'del_postcomment';
    	}
    	pinglunPost(formUrl,'',action,idtype,aid,pid,reppid,jQ(this))
    })
    
    /**
     *    分享开关
     **/
	if('1'=='2'){
	require('hx_guanli_fenxiang')
	    jQ('.share-btn').live('click', function() {
	    	var box = jQ(this).siblings();
	        box.clearQueue();
	        box.toggle();
	       	jQ(this).mouseout(function(){
	        	box.delay(1000).fadeOut(400);
	       	})
	    })
			jQ('.pl-share ul').live('mouseover',function(){
			jQ(this).clearQueue();
		});
		jQ('.pl-share ul').live('mouseout',function(){
			jQ(this).delay(1000).fadeOut(400);
		});
	}
    
	/**
	*	by jiantian
	*	time 2013.01.26
	*	评论窗口激活
	**/
	jQ(document).on('focusin','#message',function(){
		jQ(this).parents('form').addClass('form-click').find('.subscribe-btn').addClass('textarea-click');
	})
	jQ(document).on('focusout','#message',function(){
		jQ(this).parents('form').removeClass('form-click');
	})
	
	
	/**
	*	by jiantian
	*	time 2013.01.28
	*	点评收缩展开
	**/
	jQ(document).on('click','.reply,.dianping-mini-box,.i-dianping-close',function(){
		var box = jQ(this).parents('.pinglun-box').find('.dianping-list'),
			miniBox = jQ(this).parents('.pinglun-box').find('.dianping-mini-list');
		/*如果是关闭的就打开它，否则就关闭它*/
		if(box.is(':hidden')){
			//缓存点评内容
			jQ('.textarea-txt').data({'name':'','msg':''});
			
			box.show();
			miniBox.hide();
		}else{
			box.hide();
			miniBox.show();
		}
	})
	
	/**
	*	by jiantian
	*	time 2013.01.28
	*	点评收缩展开
	**/
	jQ('.view-delete-btn,.view-del-btn').live('mouseover',function(){
		jQ(this).parent().parent().addClass('red-bg')
	})
	jQ('.view-delete-btn,.view-del-btn').live('mouseout',function(){
		jQ(this).parent().parent().removeClass('red-bg')
	})
	
	/**
	*	by jiantian
	*	time 2013.05.08
	*	隐藏踩的过多的评论
	**/
	jQ('.disagree').each(function(i){
		var box = jQ(this).parents('.pinglun-box')
			,d_num = pIntAndDel(jQ(this).find('span').text())
			,agree_num = isUndefined(jQ(this).siblings('.agree').find('span').text())?'0':jQ(this).siblings('.agree').find('span').text()
			,agree_num = pIntAndDel(agree_num)
			,reply_num = isUndefined(jQ(this).siblings('.reply').find('span').text())?'0':jQ(this).siblings('.reply').find('span').text()
			,reply_num = pIntAndDel(reply_num)
			;
		if(d_num < 25 && d_num > 5 && agree_num <=0 && reply_num <=0){
			box.before('<div class="cool-pinglun">该评论相当无趣，已被隐藏，点击可查看</div>')
			box.hide();
		}
	});
	jQ('.cool-pinglun').live('click',function(){
		jQ(this).hide().next('.pinglun-box').show();
	})
	
	/**
	*	by jiantian
	*	time 2013.07.27
	*	图说
	**/
	if(jQ('.tushuo-neirong').length>0){
		require('jquery.ad-gallery');
		require('jquery.ad-gallery.css');
		jQ(function() {
		var galleries = jQ('.ad-gallery').adGallery();
		});
	}
	
	/**
	*	by jiantian
	*	time 2013.07.27
	*	用点嗅一下
	**/
	if(jQ('.comment-title').length>0){
		jQ('.comment-title').click(function(){
			if(isLogin()){
				jQ('#textarea').focus();
			}else{
				jQ('#lgnModal').modal('show');
			}
		})
	}
	
	/**
	*	向作者提问
	*	by jiantian
	*	time 2013.07.20
	**/
	if(jQ('.askAuthor').length>0){
		var box = jQ('.askAuthor'),boxName = box.attr('name');
		box.attr({href:'javascript:void(0)'});
		
		box.live('click',function(){
			if(isLogin()){
				jQ('#textarea').focus().val(boxName);
			}else{
				jQ('#lgnModal').modal('show');
			}
		})
	}
	
	
	
	/**
	*	by jiantian
	*	time 2013.01.30
	*	提交评论
	*	url 提交的URL
	*	message 内容
	*	action 操作类型
	*	idtype 帖子类型
	*	aid 文章id
	*	pid 评论id
	*	reppid 点评id
	*	btnid 点击对象
	**/
	function pinglunPost(url,message,action,idtype,aid,pid,reppid,btnid){
		var url = url
			,msg = encodeURI(message)
			,action = action
			,idtype = idtype
			,aid = isUndefined(aid) ? '' : aid
			,pid = isUndefined(pid) ? '' : pid
			,reppid = isUndefined(reppid) ? '' : reppid
			,postData = {'message':msg,'act':action,'idtype':idtype,'aid':aid,'pid':pid,'reppid':reppid}
			,boxid = '';
		jQ.post(url,postData,function(data){
	        var data = eval('(' + data + ')');
			if(data.is_success=='1'){
				data.username = isUndefined(data.username)?'虎嗅网友':data.username;
				if(action=='add_post'){
					htmlWiter('#pinglun_list',action,aid,data.pid,data.reppid,data.username,data.yijuhua,data.message);
				}else if(action=='add_postcomment'){
						htmlWiter(jQ('#g_pid'+pid).find('.dianping-form'),action,aid,data.pid,data.reppid,data.username,data.yijuhua,data.message);
				}else if(action=='del_post'){
					var box = jQ(btnid).parents('.pinglun-box');
					htmlDelete(box);
				}else if(action=='del_postcomment'){
					var box = jQ(btnid).parents('.dianping-box');
					htmlDelete(box);
				}else if(action=='add_recommend' || action == 'del_recommend'|| action=='add_article_eye'||action=='del_article_eye'){
					var boxid = '#g_pid'+pid;
					recommendSet(boxid,btnid,action)
				}
				
			}else{
				showDialog(data.msg,'notice','提示信息','','0','','','','','5','')
			}
			//成功后打开提交
			plStart='1';
		})
		
	}

	/**
	*    过滤多余“回复@”并增加@代码
	*    点评引用时用
	**/
	function htmlGroup(t) {
		var reg = /\/\//g;
		var reg2 = /回复@.*?：/g;
		t = t.replace(reg2, '');
		if(reg.test(t)){
			var t = t.split("//");
		    var re = ">"+name+"</g";
		    var m = t[0]+"//"+t[1];
		    return m;
	    }else{
	    	return t;
	    }
	}
	
	/**
	*    过滤内容里的括号，并返回整数型数据
	**/
	function pIntAndDel(d){
		var d = d==''?'0':d
			,d = d.replace('(','')
			,d =  parseInt(d.replace(')',''))
		return d;
	}
	
	
	
	/**
	*    添加评论和点评加动画效果
	**/
	function htmlWiter(boxid,action,aid,pid,reppid,username,signature,msg){
		var pinglunBox = '<div class="clearfix pinglun-box pinglun-box-set" id="g_pid'+pid+'"><div class="user-img"><a href="/member/'+uid+'.html" title="'+username+'" class="tx-img" target="_blank" c="1"><img src="/user.huxiu.com/auth/avatar.php?uid=' + uid + '&size=small"></a></div><div class="pinglun-box-text"><a class="name" href="/member/'+uid+'.html" target="_blank" title="'+username+'">'+username+'</a><span class="signature" title="'+signature+'">'+signature+'</span><div class="view-info">'+msg+'</div></div><div class="clearfix view-func"><time class="pull-left s-time">刚刚</time><span class="pl-share"><i class="icon-i"></i>分享<div class="share-box side-share-box2"><ul><li class="pos-btn hxs-tsina" des="hxs_tsina" pid="'+pid+'" title="分享到新浪微博"></li><li class="pos-btn hxs-tqq" des="hxs_tqq" pid="'+pid+'" title="分享到腾讯微博"></li><li class="pos-btn hxs-qzone" des="hxs_qzone" pid="'+pid+'" title="分享到QQ空间"></li><li class="pos-btn hxs-renren" des="hxs_renren" pid="'+pid+'" title="分享到人人网"></li><li class="pos-btn hxs-douban" des="hxs_douban" pid="'+pid+'" title="分享到豆瓣"></li><li class="pos-btn hxs-t163" des="hxs_t163" pid="'+pid+'" title="分享到网易微博"></li><li class="pos-btn hxs-linkedin" des="hxs_linkedin" pid="'+pid+'" title="分享到linkedin"></li><li class="pos-btn hxs-tomail" des="hxs_tomail" title="分享到邮件分享"></li></ul></div></span><span class="agree"><i class="icon-i"></i>顶</span><span class="disagree"><i class="icon-i"></i>踩</span><span class="reply"><i class="icon-i"></i>点评</span></div><div class="clearfix dianping-list"><div class="clearfix dianping-form"><form onsubmit="return false;" action="POST" method="/forum.php?mod=hxpost&action=reply&type=2&aid='+aid+'"><div class="dianping-textarea"><textarea class="textarea-txt" action-type="check" cols="" rows="" name=""></textarea></div><input type="reset" style="display:none"><input type="hidden" name="aid" value="'+aid+'"><input type="hidden" name="pid" value="'+pid+'"><input type="hidden" name="reppid" value=""><input type="hidden" name="act" value="add_postcomment"><input type="hidden" name="idtype" value="aid"><div class="pull-right dianping-btn"><button type="submit" name="comment_btn" value="true" class="button-txt subscribe-btn"><strong>回复</strong></button></div></form></div><i class="icon-i i-dianping-jiao"></i><i class="icon-i i-dianping-close"></i></div><span class="view-set-s"><a href="javascript:void(0)" class="view-delete-btn" action="del_post" title="确定删除?">删除</a></span></div>';
		var dianipingBox = '<div class="clearfix dianping-box dianping-box-set"><div class="user-img"><a href="/member/'+uid+'.html" title="'+username+'" c="1" class="tx-img" target="_blank"><img src="/user.huxiu.com/auth/avatar.php?uid='+uid+'&size=small" ></a></div><div class="dianping-box-text"><span class="dd-s"><a class="name" href="/member/'+uid+'.html" target="_blank" title="'+username+'">'+username+'</a>：'+msg+'</span><div class="clearfix dianping-func"><time class="pull-left s-time"><span title="刚刚">刚刚</span></time><span class="pull-right"><a href="javascript:void(0);" class="view-del-btn" reppid="'+reppid+'" title="确定删除?">删除</a><span class="pinglun-reply-btn">回复</span></span></div></div></div>';
		
		var box = '<div class="post-box" style="width:100%;height:123px;background-color:#fefefe;border:2px solid #ccc;padding:5px;position:absolute;right:-13px;bottom:9px;">'+msg+'</div>';
		if(action=='add_post'){
			jQ('.textarea-box').prepend(box).find('#textarea').val('');
			jQ('.post-box').animate({opacity:'0',width:'0',height:'0'}, 400,function(){
				jQ(this).remove();
				jQ(boxid).prepend(pinglunBox)
					.find(".pinglun-box:first").css({opacity:".2"}).animate({opacity:"1"}, 800);
			});
		}else if(action=='add_postcomment'){
			jQ(boxid).find('textarea').val('');
			var boxidHeight = jQ(boxid).find('textarea').height();
			jQ(boxid).find('.dianping-textarea').prepend(box);
			jQ('.post-box').height(boxidHeight).animate({opacity:'0',width:'0',height:'0'}, 400,function(){
				jQ(this).remove();
				jQ(boxid).after(dianipingBox)
					.find('.dianping-box:first').css({opacity:'.4'}).animate({opacity:'1'}, 500);
			})
		}
		
	}
	
	/**
	*    删除评论和点评加动画效果
	**/
	function htmlDelete(box){
		jQ(box).animate({opacity:'0',left:'150'},300,function(){
			jQ(this).remove();
		})
	}
	
	/**
	*	设置推荐和取消推荐,点睛和取消点睛
	**/
	function recommendSet(boxid,btnid,action){
		if(action=='add_recommend'){
			jQ(btnid).attr({'action':'del_recommend','title':'取消推荐'}).text('取消');
			jQ(boxid).addClass('pinglun-box-youliao').append('<div class="pinglun-box-youliao-mark"><span>有料</span></div>');
		}else if(action=='del_recommend'){
			jQ(btnid).attr({'action':'add_recommend','title':'推荐'}).text('推荐');
			jQ(boxid).removeClass('pinglun-box-youliao').find('.pinglun-box-youliao-mark').remove();
		}else if(action=='add_article_eye'){
			jQ(btnid).attr({'action':'del_article_eye','title':'取消点睛'}).text('取消');
			jQ(boxid).addClass('pinglun-box-youliao').append('<div class="pinglun-box-youliao-mark dianjing-mak"><span>点睛</span></div>');
		}else if(action=='del_article_eye'){
			jQ(btnid).attr({'action':'add_article_eye','title':'画龙点睛'}).text('点睛');
			jQ(boxid).removeClass('pinglun-box-youliao').find('.pinglun-box-youliao-mark').remove();
		}
	}
	

	/**
	* 顶踩效果
	**/
	function agreeDisagree(t, msg, type) {
	    var pos = jQ(t).offset();
	    var ani = jQ('<div class="voteAni" style="color:green;">' + msg + '</div>');
	    ani.appendTo('body');
	    if (type == "1") {
	        ani.offset({left:pos.left + 5, top:pos.top - 10})
	            .show()
	            .animate({
	                'font-size':'40px', 'opacity':'0.1', 'top':'-=50px'
	            }, 400, 'linear', function () {
	                ani.remove();
	            }
	        );
	    } else {
	        ani.offset({left:pos.left - 20, top:pos.top - 20})
	            .show()
	            .animate({
	                'opacity':'0.8', 'top':'-=20px'
	            }, 400, 'linear', function () {
	                ani.remove();
	            }
	        );
	    }
	}
	
	
	/**
	 *    @js调用
	 **/
	function atFind(data) {
	    jQ("textarea").atWho("@", {
	        tpl:"<li data-value='${key}'>${name} </li>", cache:false, limit:5, 'data':data
	    });
	}
	
	/**
	*	扩展阅读
	**/
	if(jQ('#extra_read').length>0){
		require('extra_read_j');
	}
})
