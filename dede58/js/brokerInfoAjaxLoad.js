/**
 * Created by jtrhb on 2016/3/31.
 */
function loadBrokerInfo(){
    var url='http://192.168.31.243/plus/brokerinfo.php';
    //var url='http://localhost/plus/brokerinfo.php';
    var shouldLoad=0;
    var lic=[0,0,0,0,0,0];
    var hq=[0,0,0,0,0,0];
    var office=[0,0];
    var maxLev;
    var deposit=[0,0];
    var withdraw=[0,0];
    var mode=[0,0,0];
    if($('#lic1').is(':checked')){
        lic[0]=1;
        shouldLoad=1;
    }
    if($('#lic2').is(':checked')){
        lic[1]=1;
        shouldLoad=1;
    }
    if($('#lic3').is(':checked')){
        lic[2]=1;
        shouldLoad=1;
    }
    if($('#lic4').is(':checked')){
        lic[3]=1;
        shouldLoad=1;
    }
    if($('#lic5').is(':checked')){
        lic[4]=1;
        shouldLoad=1;
    }
    if($('#lic6').is(':checked')){
        lic[5]=1;
        shouldLoad=1;
    }
    if($('#hq1').is(':checked')){
        hq[0]=1;
        shouldLoad=1;
    }
    if($('#hq2').is(':checked')){
        hq[1]=1;
        shouldLoad=1;
    }
    if($('#hq3').is(':checked')){
        hq[2]=1;
        shouldLoad=1;
    }
    if($('#hq4').is(':checked')){
        hq[3]=1;
        shouldLoad=1;
    }
    if($('#hq5').is(':checked')){
        hq[4]=1;
        shouldLoad=1;
    }
    if($('#hq6').is(':checked')){
        hq[5]=1;
        shouldLoad=1;
    }
    if($('#hq7').is(':checked')){
        hq[6]=1;
        shouldLoad=1;
    }
    if($('#pd-unipay').is(':checked')){
        deposit[0]=1;
        shouldLoad=1;
    }
    if($('#pd-credit').is(':checked')){
        deposit[1]=1;
        shouldLoad=1;
    }
    if($('#pw-unipay').is(':checked')){
        withdraw[0]=1;
        shouldLoad=1;
    }
    if($('#pw-credit').is(':checked')){
        withdraw[1]=1;
        shouldLoad=1;
    }
    maxLev=$('#maxlev').val();
    shouldLoad=1;
    if($('#officeY').is(':checked')){
        office[0]=1;
        shouldLoad=1;
    }
    if($('#officeN').is(':checked')){
        office[1]=1;
        shouldLoad=1;
    }
    if($('#mode-book').is(':checked')){
        mode[0]=1;
        shouldLoad=1;
    }
    if($('#mode-stp').is(':checked')){
        mode[1]=1;
        shouldLoad=1;
    }
    if($('#mode-ecn').is(':checked')){
        mode[2]=1;
        shouldLoad=1;
    }
    var data={ajax:'pullload',lic:lic,hq:hq,deposit:deposit,withdraw:withdraw,maxLev:maxLev,office:office,mode:mode};
    if(shouldLoad){
        function ajax(url, data) {
            $.ajax({url: url,data: data,async: false,type: 'GET',dataType: 'json',success: function(data) {
                loadContent(data);
            }});
        }
        ajax(url,data);
    }
}

function loadContent(rs) {
    $('#broker-info-main').empty();
    if (rs.statu == 1) {
        var info=[];
        var data = rs.list;
        var length = data.length;
        for (var i = 0; i < length; i++){
            info.push('<tr> <td class="cell-with-border"> <div class="brokerinfo-col-1"> <b>'+data[i].broker_name_cn+data[i].broker_name+'</b> </div>');
            info.push('<div class="brokerinfo-logo"><img src="'+data[i].broker_logo+'" class="broker-logo"/></div></td>');
            info.push('<td colspan="2" class="broker-info-col-2"><div id="col-2-anchor"><b>所属国家：</b>'+data[i].headquarter+'</div>');
            info.push('<div><b>成立时间：</b>'+data[i].date_founded+'</div><div><b>经营模式：</b>'+data[i].operation_mode_cn+'</div><div><b>监管机构：</b><a href="'+data[i].main_license_href+'">'+data[i].main_license+'</a></div><div>');
            info.push('<b>平均点差：</b>欧美'+data[i].eurusd+'</div></td>');
            info.push('<td class="broker-info-col-4" colspan="2"><div id="Chart'+data[i].broker_id+'">');
            $('#broker-info-main').append(info.join(''));
            var dataChart = [
                [
                    {axis: "交易环境", value: data[i].trading_env_score},
                    {axis: "出入金", value: data[i].depo_with_score,yOffset:-5},
                    {axis: "服务", value: data[i].service_score},
                    {axis: "活动", value: data[i].prom_score},
                    {axis: "监管", value: data[i].regu_score,yOffset:-5}
                ]
            ];
            RadarChart.draw('#Chart'+data[i].broker_id+'', dataChart);
            $('#broker-info-main').append('</div></td></tr>');
            info=[];
            //info.push('var data = [[{axis: "交易环境", value: "'+data[i].trading_env_score+'"},{axis: "出入金", value: "'+data[i].depo_with_score+'",yOffset:-5},');
            //info.push('{axis: "服务", value: "'+data[i].service_score+'"},{axis: "活动", value: "'+data[i].prom_score+'"},{axis: "监管", value: "'+data[i].regu_score+'",yOffset:-5}]];');
            //info.push('RadarChart.draw("#Chart'+data[i].broker_id+'", data);</script></div></td></tr>');
        }
        //var brokerinfo=info.join('');
        //$('#broker-info-main').append(brokerinfo);
        //var appendArticles = loadConfig.arr[articletype].join('');
        //var tabSelector = '#'+articletype+' div:first';
        //$(tabSelector).append(appendArticles);//Jquery选择要加载的DIV
        //loadConfig.page[articletype]++;//递增页码
    }
}