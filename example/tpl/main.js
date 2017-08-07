var ajax = {
  xhr: function() {
    var x;
    try {
      x = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        x = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (E) {
        x = false;
      }
    }
    if (!x && typeof XMLHttpRequest != 'undefined') {
      x = new XMLHttpRequest();
    }
    return x;
  },
  post: function(param) {
    var xhr = this.xhr();
    xhr.open("post", param['url']);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (typeof param == 'undefined') {
          return true;
        } else if (typeof param['callback'] == 'function') {
          param['callback'](xhr.responseText);
        }
        return true;
      }
    }
    xhr.send(param['data']);
  }
}
var search = {
  query: function(input, event) {
    var e = event || window.event;
    if (e.keyCode == 13) {
      if ((input.value).length == 0) {
                     input.focus();
                     return;
                  }

                  addTag(input.value);

                  var loading = document.getElementById("loading_text");
                  var preview = document.getElementById("preview_text");
                  preview.classList.add("none");
                  loading.classList.remove("none");

                  var url = "/vk-competition/?act=addRules";
                  ajax.post({
                     url: url,
                     data: "value=" + input.value,
                     callback: function(data) {
                       console.log(data);
                       if (data != 200) {
                         loading.innerHTML = data;
                       } 
                     }
                  });
                  input.value = "";
              }
            }
         }
         function deleteTag(tag) {
            var tag_el = document.getElementById("tag" + tag);
            var url = "/vk-competition/?act=delRules";
            tag_el.innerHTML = "Удаляем...";
            ajax.post({
               url: url,
               data: "tag=" + tag,
               callback: function(data) {
                  tag_el.classList.add("none");
               } 
            });
         }
         function addTag(value) {
            var header_tag = document.getElementById("header_tag");
            var spl = value.split(",");
            for (var i = 0; i < spl.length; i++) {
               var tag_block = document.createElement("div");
               tag_block.innerHTML = spl[i].split("=")[0];
               tag_block.id = "tag" + spl[i].split("=")[1];
               tag_block.classList.add("tag");
               tag_block.setAttribute("onclick", "deleteTag(" + spl[i].split("=")[1] +  ")");
               header_tag.appendChild(tag_block);
            }
         }