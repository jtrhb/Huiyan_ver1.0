<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="gb2312">
        <title>�������� - <?php echo $GLOBALS['_vars']['spacename']; ?></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="author" content="<?php echo $GLOBALS['_vars']['uname']; ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <!-- Le styles -->
        <link href="/dede58/css/bootstrap.min.css" rel="stylesheet">
        <link href="/dede58/css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="/dede58/css/hx-2013.css" rel="stylesheet">
        <!--[if lt IE 9]>
        <link href="/dede58/css/hx-2013-ie5.css" rel="stylesheet">
        <![endif]-->
    </head>
    <body data-spy="scroll" data-target=".bs-docs-sidebar">
        <div class="container-hx">
        <?php include(DEDEMEMBER."/templets/login_box.htm"); ?>     
                <script src="/plus/mytag_js.php?aid=1" language="javascript"></script>
            <div class="row-fluid-wrap-hx">
                <div class="center-container-hx">
                    <div class="clearfix row-fluid-hx"><div class="center-ctr-wrap">
    <div class="center-ctr-box">
        <?php include $this->CompilerInclude("author-card.htm");
 ?>
        <div class="personal-homepage">
            <?php include $this->CompilerInclude("author-menu.htm");
 ?>


            <div class="personal-homepage-list">
                    
<div class="east">
    <dl class="border">
      <dt class="caption"><strong>��������</strong></dt>
      <dd class="body pB10">
        <table width="700" align="center" class="tList">
          <tr>
            <td>�ǳƣ�</td>
            <td><?php 
             $row = $dsql->GetOne("SELECT  * from `#@__member_person` where mid='{$_vars['mid']}' ");
            echo $row['uname']; ?></td>
          </tr>
          <tr>
            <td width="101">�Ա� </td>
            <td width="593"><?php echo $row['sex']; ?></td>
          </tr>
          <tr>
            <td>Ŀǰ���ڵأ�</td>
            <td> ʡ�ݣ�
              <?php
			$places = GetEnumsTypes($row['place']);
			echo ( isset($em_nativeplaces[$places['top']]) ?  $em_nativeplaces[$places['top']] : '');
		  ?>
              &nbsp; ���У�
              <?php
		  echo ( isset($em_nativeplaces[$places['son']]) ?  $em_nativeplaces[$places['son']] : '');
		  ?></td>
          </tr>
          <tr>
            <td>�������ڵأ�</td>
            <td> ʡ�ݣ�
              <?php
			$places = GetEnumsTypes($row['oldplace']);
			echo ( isset($em_nativeplaces[$places['top']]) ?  $em_nativeplaces[$places['top']] : '');
		  ?>
              &nbsp; ���У�
              <?php
		  echo ( isset($em_nativeplaces[$places['son']]) ?  $em_nativeplaces[$places['son']] : '');
		  ?></td>
          </tr>
          <tr>
            <td>�������ڣ�</td>
            <td><?php echo $row['birthday']; ?></td>
          </tr>
          <tr>
            <td>����Ŀ�ģ�</td>
            <td><?php echo GetEnumsValue('datingtype',$row['datingtype']); ?></td>
          </tr>
          <tr>
            <td>����״����</td>
            <td><?php echo GetEnumsValue('marital',$row['marital']); ?></td>
          </tr>
          <tr>
            <td>������</td>
            <td><?php echo GetEnumsValue('star',$row['star']); ?></td>
          </tr>
          <tr>
            <td>Ѫ�ͣ�</td>
            <td><?php echo GetEnumsValue('blood',$row['blood']); ?></td>
          </tr>
          <tr>
            <td>���ߣ�</td>
            <td>><?php echo $row['height']; ?> ����</td>
          </tr>
          <tr>
            <td>���ͣ�</td>
            <td><?php echo GetEnumsValue('bodytype',$row['bodytype']); ?></td>
          </tr>
        </table>
      </dd>
    </dl>
    <dl class="border mT10">
      <dt class="caption"><strong>����״��</strong></dt>
      <dd class="body pB10">
        <table width="700" align="center" class="tList">
          <tr>
            <td width="101">���������</td>
            <td width="593"><?php echo GetEnumsValue('income',$row['income']); ?></td>
          </tr>
          <tr>
            <td>�����̶ȣ�</td>
            <td><?php echo GetEnumsValue('education',$row['education']); ?></td>
          </tr>
          <tr>
            <td>ס�������</td>
            <td><?php echo GetEnumsValue('house',$row['house']); ?></td>
          </tr>
          <tr>
            <td>������ҵ��</td>
            <td><?php echo GetEnumsValue('vocation',$row['vocation']); ?></td>
          </tr>
          <tr>
            <td>�������ԣ�</td>
            <td>
              <?php
    $arr = $dsql->GetOne("Select * From `#@__sys_set` where sname='language' ");
    $sets = explode(',',$arr['items']);
    foreach($sets as $v){
    	if(preg_match("#".$v."#", $row['language'])) echo "  $v ";
    }
    ?></td>
          </tr>
        </table>
      </dd>
    </dl>
    <dl class="border mT10">
      <dt class="caption"><strong>��Ȥ����</strong></dt>
      <dd class="body pB10">
        <table width="700" align="center" class="tList">
          <tr>
            <td width="101">�Ƿ�Ⱦƣ�</td>
            <td width="593"><?php echo GetEnumsValue('drink',$row['drink']); ?></td>
          </tr>
          <tr>
            <td>�Ƿ���̣�</td>
            <td><?php echo GetEnumsValue('smoke',$row['smoke']); ?></td>
          </tr>
          <tr>
            <td>��Ȥ���ã�</td>
            <td> <?php
    	$arr = $dsql->GetOne("Select * From `#@__sys_set` where sname='nature' ");
    	$sets = explode(',',$arr['items']);
    	foreach($sets as $v){
    		if(preg_match("#".$v."#",$row['nature'])) echo " $v ";
    	}
    	?></td>
          </tr>
        </table>
      </dd>
    </dl>
  </div>
    
                    
                
              </div>            
              <div class="clearfix pages">
                <div class="pull-right pgs"></div>            </div>
        </div>
    </div>
</div>
<?php include $this->CompilerInclude("right.htm");
 ?>
</div>
<script src="/plus/mytag_js.php?aid=3" language="javascript"></script></div>
</div>
</div>
<div id="append_parent"></div><div id="ajaxwaitid"></div>



</body>
</html>