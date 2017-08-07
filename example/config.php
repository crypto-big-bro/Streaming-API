<?php 

session_start();
set_time_limit(0);
header('Content-type: text/html; charset=utf-8');
header("X-Frame-Options:sameorigin");

define("VK_DIR", $_SERVER['DOCUMENT_ROOT'] . "/vk-competition/scripts/");

$server_time = $_SERVER['REQUEST_TIME'];

spl_autoload_register(function ($class) {
  $prefix = "VKcompetition\\";
  $len = strlen($prefix);
  
  if (strncmp($prefix, $class, $len) !== 0) return;

  $relative_class = substr($class, $len);
  $file = VK_DIR. str_replace('\\', '/', $relative_class) . '.php';

  if (file_exists($file)) {
    require $file;
  }
});