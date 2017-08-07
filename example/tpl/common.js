var socket = new WebSocket("wss://streaming.vk.com/stream?key=" + window.key);
var close_connect = ge("close_connect");
var scrollTop = 0;
var count = {
  "comment": 0,
  "share": 0,
  "post": 0,
}
var array_post_id = [];
var filter = {
  limit: 100,
  top: true,
  type: {
    "post": true,
    "comment": true,
    "share": true,
  },
  "show_public": true, 
  parse: function() {
    //post 
    if (this.type['post'] == false) {
      var post_all = document.querySelectorAll("[data-type=post]");
      for (var i = 0; i++ < post_all.length; post_all[i - 1].classList.add('none'));
    } else {
      var post_all = document.querySelectorAll("[data-type=post]");
      for (var i = 0; i++ < post_all.length; post_all[i - 1].classList.remove('none'));	
    }

    //comment 
    if (this.type['comment'] == false) {
      var comment_all = document.querySelectorAll("[data-type=comment]");
      for (var i = 0; i++ < comment_all.length; comment_all[i - 1].classList.add('none'));
    } else {
      var comment_all = document.querySelectorAll("[data-type=comment]");
      for (var i = 0; i++ < comment_all.length; comment_all[i - 1].classList.remove('none'));	
    }

    //share 
    if (this.type['share'] == false) {
      var share_all = document.querySelectorAll("[data-type=share]");
      for (var i = 0; i++ < share_all.length; share_all[i - 1].classList.add('none'));
    } else {
      var share_all = document.querySelectorAll("[data-type=share]");
      for (var i = 0; i++ < share_all.length; share_all[i - 1].classList.remove('none'));	
    }

    //show || hide public
    var main = ge("main");
    if (!this.show_public) main.classList.add("none");
    else main.classList.remove("none");
  }
};

function ge(id) {
  return document.getElementById(id);
}

function timestampToDate(ts) {
  var d = new Date();
  d.setTime(ts);
  return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + " в " + d.getHours() + ":" + d.getMinutes();
}

window.onscroll = function() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
}

function setLimit(input) {
  var value;
  if (!(+input.value)) return;
  if (input.value > 1000) value = 1000;
  else if (input.value < 100) value = 100;
  else value = input.value;
  filter.limit = value;
  return input.value = value;
}

function setTypePublic(el) {
  var type_public = el.dataset.typePublic;
  var value_obj = el.dataset.value;
  console.log("Type public - " + type_public + " value - " + value_obj);

  var check_container = document.querySelectorAll("[data-type-public=" + type_public + "]")[0];
  if (value_obj == "on") {
    check_container.classList.remove("check-m-on");
    el.classList.remove("check-on");
    el.setAttribute("data-value", "off");

    //filter 
    if (type_public == "post") filter.type['post'] = false;
    else if (type_public == "share") filter.type['share'] = false;
    else if (type_public == "comment") filter.type['comment'] = false;
    else if (type_public == "top") filter.top = false;
    else if (type_public == "show_public") filter.show_public = false;
  } else {
    check_container.classList.add("check-m-on");
    el.classList.add("check-on");
    el.setAttribute("data-value", "on");

    //filter 
    if (type_public == "post") filter.type['post'] = true;
    else if (type_public == "share") filter.type['share'] = true;
    else if (type_public == "comment") filter.type['comment'] = true;
    else if (type_public == "top") filter.top = true;
    else if (type_public == "show_public") filter.show_public = true;
  }
  filter.parse();
}

function headerFilter(bool) {
  var filter_block = ge("header_panel_filter");
  var filter_block_text = ge("filter_bl_text");
  if (bool) {
  	filter_block.classList.add("header-panel-filter-active");
  	filter_block_text.innerHTML = "скрыть фильтры";
  	filter_block_text.setAttribute("onclick", "headerFilter(false)");
  } else {
  	filter_block.classList.remove("header-panel-filter-active");
  	filter_block_text.innerHTML = "показать фильтры";
  	filter_block_text.setAttribute("onclick", "headerFilter(true)");
  }
}

var parser = function(json) {
  var response = JSON.parse(json);
  console.log(response);
  var code = response.code;
  console.log(code);

  if (code != 100) return;

  var tpl_block = document.getElementById("tpl");
  var tpl = tpl_block.innerHTML;
  var main_tpl = tpl_block.innerHTML;
  var content = document.getElementById("main").innerHTML;
  var main = document.getElementById("main");

  var time = response.event['creation_time'];
  var date = new Date(time);
  var type;

  var cnt = ge("cnt");
  var cnt_value = +cnt.innerHTML;
  cnt.innerHTML = cnt_value + 1;

  var creation_time = timestampToDate(response.event['creation_time'] * 1000);

  if (response.event['event_type'] == "post") {
  	type = "Публикация";
  	count['post'] = ++count['post'];
  } else if (response.event['event_type'] == "comment") { 
  	type = "Комментарий";
  	count['comment'] = ++count['comment'];
  } else if (response.event['event_type'] == "share") {
  	type = "Репост";
  	count['share'] = ++count['share'];
  }

  var photo_context;
  if (response.event.attachments) {
    //image 
    if (response.event.attachments[0].type == "photo") {
      photo_context = '<div class="body-img"><img alt="image" src="' + response.event.attachments[0].photo['photo_604'] + '" /></div>';
    } else {
      photo_context = "";
    }
  } else {
    photo_context = "";
  }

  tpl = tpl.split("{event_type}").join(type);
  tpl = tpl.split("{text}").join(response.event['text']);
  tpl = tpl.split("{url}").join(response.event['event_url']);
  tpl = tpl.split("{date}").join(creation_time);
  tpl = tpl.split("{photo}").join(photo_context);
  tpl = tpl.split("{type}").join(response.event['event_type']);
  tpl = tpl.split("{cnt}").join(cnt_value+1);
  tpl = tpl.split("\"").join("'");

  if (filter.top) main.innerHTML = tpl + "" +  content;
  else main.innerHTML = content + "" + tpl;

  //post_id 
  if (response.event['event_type'] != "comment") {
    var post_owner_id = response.event.event_id['post_owner_id'];
    var post_id = response.event.event_id['post_id'];
    var wall_id = post_owner_id + "_" + post_id;
    array_post_id.push(wall_id);
  }

  //limit 
  if (cnt_value + 1 >= +filter.limit) {
    socket.close();
    close_connect.innerHTML = "Достигнут лимит публикаций.";
    ge("analiz_block").classList.remove("none");
  }
}

socket.onmessage = function(event) {
  var incomingMessage = event.data;
  var loading = document.getElementById("loading_text");
  var preview = document.getElementById("preview_text");
  var serf = document.getElementById("serf");
  loading.classList.add("none");
  preview.classList.add("none");
  serf.classList.remove("none");
  parser(event.data);
  console.log(event.data);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.warn('Соединение закрыто чисто');
  } else {
    console.warn('Обрыв соединения');
  }
  console.info('Код: ' + event.code + ' причина: ' + event.reason);
  var loading = ge("loading_text");
  if (event.code == 1006) {
  	loading.innerHTML = "На этой планете уже есть человек, который сидит на этом сайте.<br/>К сожалению - это не Вы. Повторите попытку позже. <br/> Код ошибки - " + event.code;
  } else {
  	loading.innerHTML = "Что-то или кто-то здесь не так... <br/> Код ошибки - " + event.code;
  }
};

socket.onerror = function(error) {};

//close connect
close_connect.addEventListener("click", function() {
  socket.close();
  close_connect.innerHTML = "Соединение закрыто клиентом.";
  ge("analiz_block").classList.remove("none");
}, false);


function onLoad() {
  var intro = localStorage.getItem("intro_streaming");
  var block_intro = document.querySelector(".intro");

  if (intro) block_intro.classList.add("none");
  else block_intro.classList.remove("none");
}

//analization 
var analiz = {
  start: function() {
  	//
    if (count['post'] == 0 && count['comment'] == 0 && count['share'] == 0) {
      alert("Невозможно запустить анализ. Причина - публикации не найдены.");
      return;
    }

    var url = "/vk-competition/VKanaliz.php";
    var loading = ge("loading_sp");
    var button = ge("btn_analiz");
    var analiz_stats = ge("analiz_stats");
    loading.classList.remove("none");
    button.classList.add("none");

    ajax.post({
      url: url,
      data: "post_id=" + array_post_id.join(","),
      callback: function(data) {
      	var resp = JSON.parse(data);
      	if (resp.error) {
      	  alert(resp.error);
      	  return;
      	} else {
      	  var count_likes_all_ = resp.response.count_likes_all;
      	  var count_share_all_ = resp.response.count_share_all;
      	  var count_views_all_ = resp.response.count_views_all;
      	  var analiz_posts = ge("analiz_post");
      	  var analiz_share = ge("analiz_share");
      	  var analiz_comments = ge("analiz_comments");
      	  var analiz_likes = ge("analiz_likes");
      	  var analiz_views = ge("analiz_views");
      	  var analiz_reposts = ge("analiz_reposts");
          var analiz_years = ge("analiz_years_");
          var analiz_sex = ge("analiz_sex");
          var percent_sex_m, percent_sex_w;

          if (resp.response.percent_sex_w == "-") 
            percent_sex_w = 0;
          else 
            percent_sex_w = resp.response.percent_sex_w;

          if (resp.response.percent_sex_w == "-")
            percent_sex_m = 0;
          else
            percent_sex_m = 100 - +percent_sex_w;

          console.log("spam " + resp.response.spam + "%");

      	  //insert data 
          analiz_posts.innerHTML = count['post'];
          analiz_share.innerHTML = count['share'];
          analiz_comments.innerHTML = count['comment'];
          analiz_likes.innerHTML = count_likes_all_;
          analiz_views.innerHTML = "&#8776;" + count_views_all_;
          analiz_reposts.innerHTML = count_share_all_;
          analiz_sex.innerHTML = percent_sex_w + "%, " + percent_sex_m + "%";
          analiz_years.innerHTML = resp.response.middle_years;

          //show stats
          loading.classList.add("none");
      	  analiz_stats.classList.remove("none");
      	}
      }
    });
  }
}

//close intro 
var intro_close = document.querySelector(".intro-btn-close");
intro_close.addEventListener("click", function() {
  localStorage.setItem("intro_streaming", 1);
  var block_intro = document.querySelector(".intro");
  block_intro.classList.add("none");
}, false);