<?php
/**
 * Created by PhpStorm.
 * User: shin
 * Date: 2017/3/28
 * Time: 上午12:18
 */
define ('FILE_ROOT', dirname(__FILE__)."/");
include "top/TopClient.php";
include "TopSdk.php";
include "top/request/WeitaoFeedIsrelationRequest.php";

date_default_timezone_set('Asia/Shanghai');

// if ($_POST && !empty($_POST['mixnick'])) {

$mixnick = isset($_COOKIE["tida_mixnick"])?$_COOKIE["tida_mixnick"]:'l011IpcryalXNRbsWWKIGfQok7lLcrG3nP+Acds+ZDMWyI=';
if($mixnick=="")
{
    die('no parm!');
}
else{
    //echo $mixnick;
}
//$mixnick = 'l011IpcryalXNRbsWWKIGfQok7lLcrG3nP+Acds+ZDMWyI=';
$c = new TopClient();

$c->appkey = '23614608';//protime测试
$c->secretKey = 'e12d4d69ba07122bc09dfd55320e347a';//protime测试

//判断用户是否关注对应的公共账号
$req = new WeitaoFeedIsrelationRequest();

$req->setFansNick($mixnick);
$req->setSellerNick("美宝莲旗舰店");
$resp = $c->execute($req);
echo "tmallFanUser({data:".json_encode($resp).",nickid:'$mixnick'})";
 //json_encode(array('code'=>'0','data'=>$resp,'msg'=>'ok'));

?>