<?php 

require "config.php";

use VKcompetition\VKAPI;
use VKcompetition\TPL;

//create object
$vk = new VKAPI();
$tpl = new TPL();

//authorization
$auth = $vk->auth()->execute();

//set key
$json = json_decode($auth);
$vk->setKey($json->response->endpoint, $json->response->key);


//
$act = $_GET['act'];
switch ($act) {

  //add rules 
  case "addRules":
    $value_ = $_POST['value'];
    $array_word = explode(",", $value_);

    for ($i = 0; $i < count($array_word); $i++) {
      $value = explode("=", $array_word[$i])[0];
      $tag = explode("=", $array_word[$i])[1];

      if ($tag == "") continue;

      $rules = [
        "rule" => [
          "value" => "" . $value,
          "tag" => "" . $tag
        ]
      ];

      //add
      $response = $vk->addRules($rules);
      $result = json_decode($response);	
      if ($result->error) {
        exit("Error");
      } else {
        exit("200");
      }
    }
    exit("");
    break;

  case "delRules":
    $tag = $_POST['tag'];
    $rules = [
        "tag" => $tag
    ];
      $vk->delRules($rules);
    exit();
    break;
}

//load template
$tpl->file("main.TPL");
$tpl->parse_tpl("{key}", $json->response->key);

//get rules
$rules = $vk->getRules()->execute();
$result = json_decode($rules);
if ($result->rules != null) {
  $loading_display = "";
  $preview_display = "none";

  $count = count($result->rules);
  $content = "";
  for ($i = 0; $i < $count; $i++) {
    $content .= "<div class='tag' id='tag" . $result->rules[$i]->tag . "' onclick='deleteTag(" . $result->rules[$i]->tag . ")'>" . $result->rules[$i]->value . "=" . $result->rules[$i]->tag .  "</div>";
  }
} else {
  $loading_display = "none";
  $preview_display = "";
  $content = "";
}

$tpl->parse_tpl("{tag}", $content);
$tpl->parse_tpl("{loading_display}", $loading_display);
$tpl->parse_tpl("{preview_display}", $preview_display);

$tpl->print_file();
$tpl->clear();