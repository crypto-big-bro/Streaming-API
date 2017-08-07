<?php 

namespace VKcompetition;

use VKcompetition\Request;

class VKAPI {
  
  private $endpoint;
  private $key;

  public function __construct() {
    $this->accessToken = "";
    $this->url = "https://api.vk.com/method/";
  }

  public function auth() {
    $this->url .= "streaming.getServerUrl?access_token=" . $this->accessToken . "&v=5.64";
    return $this;
  }

  public function setKey($endpoint, $key) {
    $this->endpoint = $endpoint;
    $this->key = $key;
  }

  public function getRules() {
    $this->url = "https://" . $this->endpoint . "/rules?key=" . $this->key;
    return $this;
  }

  public function addRules(array $rules) {
    $this->url = "https://" . $this->endpoint . "/rules?key=" . $this->key;
    $this->data = json_encode($rules);

    return Request::post($this->url, $this->data);
  }  

  public function delRules(array $rules) {
    $this->url = "https://" . $this->endpoint . "/rules?key=" . $this->key;
    $this->data = json_encode($rules);

    return Request::delete($this->url, $this->data);
  }  

  public function execute() {
    return Request::get($this->url);
  }
}