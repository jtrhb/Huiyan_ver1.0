define(function(require, exports){
	/**
	*	全站通用登录
	**/
	
	jQ('.float-login-box form').submit(function(){return false;})
	jQ('.float-login-box .lgn-btn').live('click',function(){
		var uName = jQ('#inputName').val()
			,uPwd = jQ('#inputPassword').val()
			,random = parseInt(Math.random()*100000)
			,uUrl = jQ('#float_form_lgn').attr('action')+'&is_ajax=1&back=?&random='+random
			,fHash = jQ('#formhash').val()
			,sbmit = jQ('#submitcode').val()
			,cBox = isUndefined(jQ('#autolgn').attr('checked'))?'':jQ('#autolgn').attr('checked')
			;
		jQ.getJSON(uUrl,{username:uName,password:uPwd,formhash:fHash,autolgn:cBox,submit:sbmit},function(data){
			if(data.is_success=='1'){
				var jsData = data.js.replace(/<\/script><script/g,'</script>,<script')
					,jsData = jsData.split(',')
					,userImg = isUndefined(data.userImg)?'':data.userImg
					,username = isUndefined(data.username)?'虎嗅网友':data.username
					,infoNum = isUndefined(data.infoNum)?'':'<span class="info-num">'+data.infoNum+'<i>'
					,dingyueNum = isUndefined(data.dingyueNum)?'':'<i class="i-red">('+data.dingyueNum+')</i>'
					,xizxinNum = isUndefined(data.xizxinNum)?'':'<i class="i-red">('+data.xizxinNum+')</i>'
					,lgnBox = '<div class="lgn-user"><a class="lgn-user-face" href="#" target="_blank"><img border="0" src="'+userImg+'"/></a><div class="btn-group"><button class="btn">'+username+infoNum+'</i></span></button><button class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" class="on">我的订阅'+dingyueNum+'</a></li><li><a href="#">我的评论</a></li><li><a href="#">我的文章</a></li><li><a href="#">我的读书</a></li><li><a href="#">我的收藏</a></li><li><a href="#">消息中心'+xizxinNum+'</a></li><li><a href="#">我的设置</a></li></ul></div></div>'
					;
				for(i=0;i<jsData.length;i++){
					var jsUrl = jQ(jsData[i]).attr('src');
					jQ.getJSON(jsUrl+'&is_ajax=1&back=?',function(data){console.log(data)});
				}
				var random = parseInt(Math.random()*100000)
					,uUrl = '/user/MemberTop?is_ajax=1&back=?&random='+random
					;
				jQ.post(uUrl,function(data){
					if(data!='0'){
						jQ('.login-box').before(data).remove();
						jQ('#lgnModal').modal('toggle');
						logout()
						if(jQ('#pinglun,.rss-wrap,.books-neirong').length>0){
							window.location.reload();
						}
					}
				})
			}else {
				alert(data.msg)
				//提示框
			}
		})
	})
})
