<?php
/**
 * Created by PhpStorm.
 * User: jtrhb
 * Date: 2016/3/31
 * Time: 19:19
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
//按条件返回经纪商数据
if(isset($_GET['ajax'])) {
    $query_license='license_owned';
    $query_hq='region';
    $query_deposit='deposit_mode';
    $query_withdraw='withdraw_mode';
    $query_maxlev='max_lev';
    $query_office='office_china';
    $query_mode='operation_mode';
    $flagOfWhereclause1=0;
    $flagOfWhereclause1Or=0;
    $flagOfWhereclause1OrElse=0;
    $flagOfWhereclause2=0;
    $flagOfWhereclauseModeDp=0;
    $flagOfWherevlauseModeWd=0;
    $flagOfWhereclauseOperationMode=0;
    $whereclauseLic='WHERE 1';
    $whereclauseHq='';
    $whereclauseModeDp='';
    $whereclauseModeWd='';
    $whereclauseMaxlev='';
    $whereclauseOffice='';
    $whereclauseOperationMode='';
    $whereclauseFinal='';
    $licNFA='';
    $licFCA='';
    $licASIC='';
    $licCYSEC='';
    $licFMA='';
    $licOTHER='';
    $licArray=array();
    $hqArray=array();
    $dpArray=array();
    $wdArray=array();
    $modeArray=array();
    $hqEurope='';
    $hqAsia='';
    $hqAmerica='';
    $hqAustralia='';
    $hqMiddleEast='';
    $hqRussia='';
    $dpUnipay='';
    $dpCredit='';
    $wdUnipay='';
    $wdCredit='';
    $maxLev=0;
    if(intval($_GET['lic'][0])){
        array_push($licArray,"$query_license LIKE '%NFA%'");
        $flagOfWhereclause1=1;
    }
    if(intval($_GET['lic'][1])){
        array_push($licArray,"$query_license LIKE '%FCA%'");
            $flagOfWhereclause1=1;
    }
    if(intval($_GET['lic'][2])){
        array_push($licArray,"$query_license LIKE '%ASIC%'");
            $flagOfWhereclause1=1;
    }
    if(intval($_GET['lic'][3])){
        array_push($licArray,"$query_license LIKE '%CYSEC%'");
            $flagOfWhereclause1=1;
    }
    if(intval($_GET['lic'][4])){
        array_push($licArray,"$query_license LIKE '%FMA%'");
            $flagOfWhereclause1=1;
    }
    if($flagOfWhereclause1){
        $licAll=join(" OR ",$licArray);
        $whereclauseLic="WHERE ($licAll)";
    }
    if(intval($_GET['lic'][5])){
        if($flagOfWhereclause1){
            $licAll=join(" OR ",$licArray);
            $whereclauseLic="WHERE (($licAll) OR ($query_license LIKE '%(O)%')";
        }
        else{
            $whereclauseLic="WHERE ($query_license LIKE '%(O)%')";
            $flagOfWhereclause1OrElse=1;
        }
    }

    if(intval($_GET['hq'][0])){
        array_push($hqArray,"'欧洲'");
        $flagOfWhereclause2=1;
    }
    if(intval($_GET['hq'][1])){
        array_push($hqArray,"'亚洲'");
        $flagOfWhereclause2=1;
    }
    if(intval($_GET['hq'][2])){
        array_push($hqArray,"'美洲'");
        $flagOfWhereclause2=1;
    }
    if(intval($_GET['hq'][3])){
        array_push($hqArray,"'大洋洲'");
        $flagOfWhereclause2=1;
    }
    if(intval($_GET['hq'][4])){
        array_push($hqArray,"'中东'");
        $flagOfWhereclause2=1;
    }
    if(intval($_GET['hq'][5])){
        array_push($hqArray,"'俄罗斯'");
        $flagOfWhereclause2=1;
    }
    if(intval($_GET['hq'][6])){
        array_push($hqArray,"'非洲'");
        $flagOfWhereclause2=1;
    }
    if($flagOfWhereclause2){
        $hqAll=join(",",$hqArray);
        $whereclauseHq="AND $query_hq IN ($hqAll)";
    }

    if(intval($_GET['deposit'][0])){
        array_push($dpArray,"$query_deposit LIKE '%中国银联%'");
        $flagOfWhereclauseModeDp=1;
    }
    if(intval($_GET['deposit'][1])){
        array_push($dpArray,"$query_deposit LIKE '%信用卡%'");
        $flagOfWhereclauseModeDp=1;
    }
    if($flagOfWhereclauseModeDp){
        $dpAll=join(" AND ",$dpArray);
        $whereclauseModeDp="AND ($dpAll)";
    }

    if(intval($_GET['withdraw'][0])){
        array_push($wdArray,"$query_withdraw LIKE '%中国银联%'");
        $flagOfWhereclauseModeWd=1;
    }
    if(intval($_GET['withdraw'][1])){
        array_push($wdArray,"$query_withdraw LIKE '%信用卡%'");
        $flagOfWhereclauseModeWd=1;
    }
    if($flagOfWhereclauseModeWd){
        $wdAll=join(" AND ",$wdArray);
        $whereclauseModeWd="AND ($wdAll)";
    }

    if(intval($_GET['maxLev'])){
        $maxLev=intval($_GET['maxLev']);
        $whereclauseMaxlev="AND $query_maxlev >= $maxLev";
    }
    if(intval($_GET['office'][0])) {
        $whereclauseOffice="AND $query_office='是'";
        if(intval($_GET['office'][1])) {
            $whereclauseOffice = "";
        }
    }else {
        if (intval($_GET['office'][1])) {
            $whereclauseOffice = "AND $query_office='否'";
        } else {
            $whereclauseOffice = "";
        }
    }
    if(intval($_GET['mode'][0])){
        array_push($modeArray,"$query_mode LIKE '%MM%'");
        $flagOfWhereclauseOperationMode=1;
    }
    if(intval($_GET['mode'][1])){
        array_push($modeArray,"$query_mode LIKE '%STP%'");
        $flagOfWhereclauseOperationMode=1;
    }
    if(intval($_GET['mode'][2])){
        array_push($modeArray,"$query_mode LIKE '%ECN%'");
        $flagOfWhereclauseOperationMode=1;
    }
    if($flagOfWhereclauseOperationMode){
        $modeAll=join(" AND ",$modeArray);
        $whereclauseOperationMode="AND ($modeAll)";
    }
    $whereclauseFinal=$whereclauseLic." ".$whereclauseHq." ".$whereclauseModeDp." ".$whereclauseModeWd." ".$whereclauseMaxlev." ".$whereclauseOffice." ".$whereclauseOperationMode;
    $sql = "SELECT broker_id,broker_name,operation_mode_cn,broker_name_cn,headquarter,region,main_license,date_founded,broker_logo,main_license_href,license_owned,deposit_mode,withdraw_mode,eurusd,gold,trading_env_score,depo_with_score,service_score,prom_score,regu_score FROM #@__broker $whereclauseFinal";
    $dsql->SetQuery($sql);
    $dsql->Execute('list');
    $statu = 0;//是否有数据，默认没有数据
    $data = array();
    $index = 0;
    while ($row = $dsql->GetArray("list")) {
        $row['broker_name_cn'] = iconv("GBK","UTF-8//IGNORE",$row['broker_name_cn']);
        $row['broker_name'] = iconv("GBK","UTF-8//IGNORE",$row['broker_name']);
        $row['headquarter'] = iconv("GBK","UTF-8//IGNORE",$row['headquarter']);
        $row['operation_mode_cn'] = iconv("GBK","UTF-8//IGNORE",$row['operation_mode_cn']);
        $row['main_license'] = iconv("GBK","UTF-8//IGNORE",$row['main_license']);
        //$row['license_owned'] = str_replace("(O)","",$row['license_owned']);
        $data[$index] = $row;
        $index++;
    }
    if (!empty($data)) {
        $statu = 1;//有数据
    }
    $result = array('statu' => $statu, 'list' => $data);
    echo json_encode($result);//返回数据
    exit();
}