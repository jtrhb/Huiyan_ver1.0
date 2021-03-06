<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="gb2312">
    <title>{dede:global.cfg_webname/}</title>
    <meta name="description" content="{dede:global.cfg_description/}" />
    <meta name="keywords" content="{dede:global.cfg_keywords/}" />
    <meta name="author" content="hui-yan.com" />
    <link rel="shortcut icon" href="/icon/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/icon/favicon.ico" type="image/x-icon" />
    <!-- Le styles -->
    <link href="/dede58/css/bootstrap.min.css" rel="stylesheet">
    <link href="/dede58/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="/dede58/css/fancyNav.css" rel="stylesheet">
    <link href="/dede58/css/articletype.css" rel="stylesheet">
    <link href="/dede58/css/radar-chart.css" rel="stylesheet">
    <!--<link href="/dede58/Flat-UI/dist/css/flat-ui.css" rel="stylesheet">-->
    <link href="/dede58/icheck/skins/square/green.css" rel="stylesheet">
    <link href="/dede58/css/bootstrap-slider.css" rel="stylesheet">
    <link href="/dede58/css/broker-detail.css" rel="stylesheet">
    <link rel="stylesheet" href="/dede58/css/normalize3.0.2.min.css" />
    <link rel="stylesheet" href="/dede58/css/css.css?v=15" />
    <!--[if lt IE 9]>
    <link href="/dede58/css/hx-2013-ie5.css" rel="stylesheet">
    <![endif]-->
    <script language="javascript" type="text/javascript" src="{dede:global.cfg_cmsurl/}/dede58/js/js/j.js" ></script>
    <script language="javascript" type="text/javascript" src="{dede:global.cfg_cmsurl/}/dede58/js/classie.js" ></script>
    <script language="javascript" type="text/javascript" src="{dede:global.cfg_cmsurl/}/dede58/js/clipboard.min.js" ></script>
    <script language="javascript" type="text/javascript" src="/dede58/js/jquery.min.js" ></script>
    <script language="javascript" type="text/javascript" src="/dede58/js/qrcode.js" ></script>
    <script language="javascript" type="text/javascript" src="/dede58/js/jquery.qrcode.js" ></script>
    <script language="javascript" type="text/javascript" src="/dede58/js/bootstrap.min.js" ></script>
    <script language="javascript" type="text/javascript" src="/dede58/js/bootstrap-slider.js"></script>
    <script language="javascript" type="text/javascript" src="{dede:global.cfg_templets_skin/}/js/pic_scroll.js"></script>
    <script language="javascript" type="text/javascript" src="{dede:global.cfg_cmsurl/}/include/dedeajax2.js"></script>
    <script src="/dede58/icheck/icheck.js"></script>
    <script src="/dede58/js/d3.v3.min.js"></script>
    <script src="/dede58/js/radar-chart.js"></script>
    <script language="javascript" type="text/javascript">
        <!--
        $(function(){
            $("a[_for]").mouseover(function(){
                $(this).parents().children("a[_for]").removeClass("thisclass").parents().children("dd").hide();
                $(this).addClass("thisclass").blur();
                $("#"+$(this).attr("_for")).show();
            });
            $("a[_for=uc_member]").mouseover();
            $("a[_for=flink_1]").mouseover();
        });

        function CheckLogin(){
            var taget_obj = document.getElementById('_userlogin');
            myajax = new DedeAjax(taget_obj,false,false,'','','');
            myajax.SendGet2("{dede:global.cfg_cmspath/}/member/ajax_loginsta.php");
            DedeXHTTP = null;
        }
        -->
    </script>
    <!--上滚鼠标滚轮出现导航栏菜单-->
    <script>
        window.onload = function(){
            h1 = document.getElementById('specialTopicTop').offsetHeight;
            h2 = document.getElementById('horizontalMenuOuterContainer').offsetHeight + h1;
        }
    </script>
    <!--悬浮固定
    <script>
        $(function() {
            var elm = $('.broker-database-filter');
            var startPos = $(elm).offset().top-parseInt($(elm).css("margin-top"));
            $.event.add(window, "scroll", function() {
                var p = $(window).scrollTop();
                //var test = parseInt($(elm).css("margin-top"));
                //startPos =  startPos - $(elm).css("margin-top");
                $(elm).css('position',((p) > startPos) ? 'fixed' : 'static');
                $(elm).css('top',((p) > startPos) ? '0px' : '');
            });
        });
    </script>
    -->
</head>
<body data-spy="scroll" data-target=".bs-docs-sidebar">
<div class="container-hx">
    {dede:include filename="head.htm"/}
</div>
<div class="container-hx-main">
    <div class="row-fluid-wrap-hx">
        <div class="center-container-hx">
            <div class="clearfix row-fluid-hx">
                <div class="center-ctr-wrap">
                    <div class="broker-database-filter">
                        <table class="table table-boarded">
                            <tr>
                                <td>
                                    <ul>
                                        <div class="broker-detail-logo">
                                            <img src="/dede58/img/fxcm.jpg" class="broker-logo"/>
                                        </div>
                                    </ul>
                                    <ul>
                                        <b id="brokerName">FXCM 福汇</b>
                                    </ul>
                                </td>
                                <td>
                                    <table id="spreadTable">
                                        <tr>
                                            <td>

                                            </td>
                                            <td>
                                                <b>Min</b>
                                            </td>
                                            <td>
                                                <b>Avg</b>
                                            </td>
                                            <td>
                                                <b>Max</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>EUR/USD</b>
                                            </td>
                                            <td>
                                                <b>0.2</b>
                                            </td>
                                            <td>
                                                <b>1.2</b>
                                            </td>
                                            <td>
                                                <b>3.0</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>Gold</b>
                                            </td>
                                            <td>
                                                <b>0.3</b>
                                            </td>
                                            <td>
                                                <b>1.5</b>
                                            </td>
                                            <td>
                                                <b>2.0</b>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <ul>
                                        <b>账户类型</b>
                                    </ul>
                                    <ul>
                                        <b>TS2 Micro</b>
                                    </ul>
                                    <ul>
                                        <b>TS2 Normal</b>
                                    </ul>
                                    <ul>
                                        <b>MT4</b>
                                    </ul>
                                    <ul>
                                        <b>ActiveTrade</b>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                <table id="basicInfoTable">
                                    <tr>
                                        <td>
                                            <b>成立时间:</b>
                                        </td>
                                        <td>
                                            <b>1999</b>
                                        </td>
                                        <td>
                                            <b>总部所在地:</b>
                                        </td>
                                        <td>
                                            <b>美国</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>拥有牌照:</b>
                                        </td>
                                        <td>
                                            <b>NFA,FCA,ASIC</b>
                                        </td>
                                        <td>
                                            <b>交易模式:</b>
                                        </td>
                                        <td>
                                            <b>交易商</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>平台软件:</b>
                                        </td>
                                        <td>
                                            <b>TS2，MT4</b>
                                        </td>
                                        <td>
                                            <b>外汇杠杆:</b>
                                        </td>
                                        <td>
                                            <b>1-400</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>入金方式:</b>
                                        </td>
                                        <td>
                                            <b>中国银联，信用卡</b>
                                        </td>
                                        <td>
                                            <b>出金方式:</b>
                                        </td>
                                        <td>
                                            <b>信用卡</b>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                <table id="scoreTable">
                                    <tr>
                                        <td>
                                        <b>环评结果:</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>交易商:福汇</b>
                                        </td>
                                        <td>
                                            <b>平台:MT4</b>
                                        </td>
                                        <td>
                                            <b>评分:88</b>
                                        </td>
                                        <td>
                                            <b>排名:3</b>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                <table id="serviceTable">
                                    <tr>
                                        <td>
                                        <b>官方客服: 8am - 21pm</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <b>网站:某某网</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <b>400电话:</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>QQ</b>
                                        </td>
                                        <td>
                                            <b>Acc</b>
                                        </td>
                                        <td>
                                            <b>IB</b>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                    <div class="broker-database-main">
                        <section id="ranking">
                            <section id="ranking_list">
                                <section class="box">
                                    <section class="col_1" title="1">1</section>
                                    <section class="col_2"><img src="/dede58/img/fxcm.jpg"  /></section>
                                    <section class="col_4">98</section>
                                </section>
                                <section class="box">
                                    <section class="col_1" title="2">2</section>
                                    <section class="col_2"><img src="/dede58/img/forexcom.jpg"  /></section>
                                    <section class="col_4">95</section>
                                </section>
                                <section class="box">
                                    <section class="col_1" title="3">3</section>
                                    <section class="col_2"><img src="/dede58/img/acy.png"  /></section>
                                    <section class="col_4">88</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">4</section>
                                    <section class="col_2"><img src="/dede58/img/fxtm.png"  /></section>
                                    <section class="col_4">84</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">5</section>
                                    <section class="col_2"><img src="/dede58/img/vantage.jpg"  /></section>
                                    <section class="col_4">82</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">6</section>
                                    <section class="col_2"><img src="/dede58/img/activetrades.jpg"  /></section>
                                    <section class="col_4">80</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">7</section>
                                    <section class="col_2"><img src="/dede58/img/fxpro.png"  /></section>
                                    <section class="col_4">79</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">8</section>
                                    <section class="col_2"><img src="/dede58/img/fxabs.png"  /></section>
                                    <section class="col_4">77</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">9</section>
                                    <section class="col_2"><img src="/dede58/img/tickmill.jpg"  /></section>
                                    <section class="col_4">76</section>
                                </section>
                                <section class="box">
                                    <section class="col_1">10</section>
                                    <section class="col_2"><img src="/dede58/img/easyforex.gif"  /></section>
                                    <section class="col_4">75</section>
                                </section>
                            </section>
                        </section>
                    </div>
            </div>
        </div>
        <ul id="shareColumn">
            <li>
                <i id="weixin"></i>
                <div id="wxQrCode"></div>
            </li>
        </ul>
        <div id="qrCodeCanvas"></div>
        <script>
            $(document).ready(function(){
                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green',
                    increaseArea: '20%' // optional
                });
            });
            $("#maxlev").slider({
                tooptip:'hide'
            });
        </script>
        <script>
            $('#qrCodeCanvas').qrcode({
                text: window.location.href,//二维码代表的字符串（本页面的URL）
                width: 167,//二维码宽度
                height: 167//二维码高度
            });
        </script>

        <div>
            {dede:include filename="footer_index.htm"/}
        </div>
    </div>
</div>
</body>
</html>