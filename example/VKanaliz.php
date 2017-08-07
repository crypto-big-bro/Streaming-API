<?php 

require "config.php";

header("Content-type: application/json; charset=utf-8");

use VKcompetition\Request;

//post_id 
$post_id = $_POST['post_id'];
//$post_id = "-150316663_76,268959347_10168,-149942481_13,411357932_387,-149043267_761,141102500_4736,25906130_3951";

//parameters 
$count_views_all = 0;
$count_likes_all = 0;
$count_share_all = 0;
$sex_profiles    = [];
$years_profiles  = [];
$sex_cnt         = 0; //woman

$spam_filter = ["ссылк", "скидк", "запис", "консультац", "девственни", "руппавушк", "груд", "ожирен", "виде", "стоимо", "всего за"];
$spam_count  = 0;
$text_post   = 0;
$spam        = implode("", $spam_filter);

if (strlen($post_id) == 0 || $post_id == "") {
	$error = ["error" => "Parameter not found"];
	$response = json_encode($error);
} else {
    $post_id_ = explode(",", $post_id);
    for ($i = 0; $i < count($post_id_); $i++) {
    	$url = "https://api.vk.com/method/wall.getById?posts=" . $post_id_[$i] . "&v=5.67";
    	$result = Request::get($url);
    	$json_result = json_decode($result);

        //count likes, views and reposts
    	$count_likes_all += $json_result->response[0]->likes->count;
        $count_share_all += $json_result->response[0]->reposts->count;
        $count_views_all += $json_result->response[0]->views->count;

        //sex and years profiles
        $from_id = $json_result->response[0]->from_id;
        $public_bool_id = substr($from_id, 0, 1);
        if ($public_bool_id == "-") continue;

        //select sex and years
        $url = "https://api.vk.com/method/users.get?user_ids=" . $from_id . "&fields=sex,bdate&v=5.67";
        $result = Request::get($url);
        $json_result = json_decode($result);
        array_push($sex_profiles, $json_result->response[0]->sex);
        
        //bdate
        $bdate = $json_result->response[0]->bdate;
        $spl = explode(".", $bdate);
        if ($spl[2] != "") {
            array_push($years_profiles, $spl[2]);
        }
    }

    //sex profiles
    $count_sex_profiles = count($sex_profiles);
    if ($count_sex_profiles != 0) {
        for ($i = 0; $i < $count_sex_profiles; $i++) {
            if ($sex_profiles[$i] == "1") ++$sex_cnt; 
        }
        $percent_sex_w = round(($sex_cnt * 100) / $count_sex_profiles);
    } else {
        $percent_sex_w = "-";
    }

    //years profiles
    $count_years_profiles = count($years_profiles);
    if ($count_years_profiles != 0) {
        $year = 0;
        for ($i = 0; $i < $count_years_profiles; $i++) {
            $year += date("Y") - $years_profiles[$i];
        }
        $middle_years = round($year / $count_years_profiles);
    } else {
        $middle_years = "-";
    }

    //response 
    $response = [
        "response" => [
        	"count_likes_all" => $count_likes_all,
        	"count_share_all" => $count_share_all,
        	"count_views_all" => $count_views_all,
            "percent_sex_w"   => $percent_sex_w,
            "middle_years"    => $middle_years,
            "spam"            => $percent_spam,
        ]
    ];

    $response = json_encode($response);
}

print $response;