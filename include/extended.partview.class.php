<?php
/**
 * Created by PhpStorm.
 * User: jtrhb
 * Date: 2016/4/20
 * Time: 21:36
 */
require_once(DEDEINC.'/arc.partview.class.php');

class extPartView extends  PartView
{
    function SetVar($k, $v)
    {
        $GLOBALS['_vars'][$k] = $v;
    }
}


