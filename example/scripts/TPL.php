<?
  
/**
* @copyright Molodcov Artyom  2016.
* @author Molodcov Artyom <molodcov.artyom@mail.ru>
* @package VK
* @version 0.0.2
*/

namespace VKcompetition;

define("DIR", $_SERVER['DOCUMENT_ROOT'] . '/vk-competition/tpl/');

/**
* @package VK
* @author Molodcov Artyom <molodcov.artyom@mail.ru>
*/
class TPL {

  /**
  * @var tpl
  */
  public $tpl;

  /**
  * @var key in
  */
  public $key;

  /**
  * @var value in
  */
  public $value;

  /**
  * @var file on replace
  */
  public $file;

  /**
  * @param file_name when replace file
  */
  public function file($file_name) {
    if (file_exists(DIR . $file_name)) {
      $this->file = file_get_contents(DIR . $file_name);
    } else die("FILE NOT FOUND");
  }

  /**
  * @param tpl_name when replace tpl
  */
  public function template($tpl_name) {
  	if (file_exists(DIR . $tpl_name)) {
      $this->tpl = file_get_contents(DIR . $tpl_name);
    } else die("FILE TPL NOT FOUND");
  }

  /**
  * @param file_name when replace
  */
  public function parse_tpl($key, $value, $tpl = false) {
    if (!$tpl) $this->file = str_replace($key, $value, $this->file);
    else $this->tpl = str_replace($key, $value, $this->tpl);
  }

  /**
  * @param file_name when replace
  */
  public function parse_block($start, $finish, $tpl = false) {
    if ($tpl) {
      $start_pos  = strpos($this->tpl, $start);
      $end_pos    = strpos($this->tpl, $finish);
      $length     = $end_pos - $start_pos + strlen($finish);
      $content    = substr($this->tpl, $start_pos, $length);
      $this->file = str_replace($content, "", $this->tpl);
    } else {
      $start_pos  = strpos($this->file, $start);
      $end_pos    = strpos($this->file, $finish);
      $length     = $end_pos - $start_pos + strlen($finish);
      $content    = substr($this->file, $start_pos, $length);
      $this->file = str_replace($content, "", $this->file);
    }
	 }

  /**
  * @param file_name when replace
  */
  public function complete($str) {
    $search = "{" . $str . "}";
    $this->file = str_replace($search, $this->tpl, $this->file);
  }

  /**
  *@param output file
  */
  public function print_file() {
    print $this->file;
  }

  /**
  * @param output tpl
  */
  public function print_tpl($str = false) {
    if (!$str) print $this->tpl;
    else {
      $search = "{" . $str . "}";
      print $this->file = str_replace($search, $this->tpl, $this->file);
    }
  }

  public function clear() {
    $this->file = null;
  }

  public function clear_tpl() {
    $this->tpl = null;
  }
}
