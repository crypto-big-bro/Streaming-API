<!DOCTYPE html>
<html lang="ru">
   <head>
      <meta charset="utf-8" />
      <title id="title">Соберём. Найдём. Покажем.</title>
      <link rel="shortcut icon" href="/tpl/img/favicon/favicon.png?1" />
      <meta name="theme-color" content="#04a7a3">
      <link rel="stylesheet" href="/tpl/css/main.css?0.2.0" media="screen" />
      <script>
         window.key = "{key}";
      </script>
      <script src="/vk-competition/tpl/main.js?4"></script>
      <link href="/vk-competition/tpl/main.css?5.2" rel="stylesheet" media="screen" />
   </head>
   <body onload="onLoad();">
      <section class="intro none">
         <div class="intro-step-container">
            <div class="intro-step-close">
               <div class="intro-btn-close">начать работу</div>
            </div>
            <div class="intro-step-1">
               <div class="intro-step-descr">1. Введите ключевое слово и тег</div>
            </div>
            <div class="intro-step-2">
               <div class="intro-step-descr">2. Используйте фильтры</div>
            </div>
            <div class="intro-step-3">
               <div class="intro-step-descr">3. Дождитесь загрузки публикаций или вручную остановите процесс, после чего можете запускать анализ публикаций</div>
            </div>
         </div>
      </section>
      <header class="header block-md_">
         <div class="header-content">
            <div class="">
               <h2>Соберём. Найдём. Покажем.</h2>
            </div>
            <div class="info">Время поиска может занять некоторое время. Мы никак не влияем на скорость появления публикаций</div>
            <div class="header-search">
               <input type="text" class="input-search" placeholder="Введите ключевое слово, тег и нажмите Enter, например, кот=1" onkeydown="search.query(this, event)">
            </div>
            <div class="header-tag" id="header_tag">{tag}</div>
         </div>
      </header>
      <section class="main-container">
         <div class="filter-s-block">
            <span id="filter_bl_text" onclick="headerFilter(true)">показать фильтры</span>
         </div>
         <div class="block-md_ header-panel-filter" id="header_panel_filter">
            <div class="block-filter">
               <div class="title-block-filter">Лимит публикаций</div>
               <div class="body-block-filter flex">
                  <div class="title-block">Лимит (min=100, max=1000)</div>
                  <div class="param-block">
                     <input type="number" min=100 max=1000 step=100 value=100 class="limit" onkeyup="return setLimit(this)" id="limit_input">
                  </div>
               </div>
               <div class="descr-param">Соединение будет разорвано, как только количество публикаций достигнет лимита. Включает в себя репосты, обычные посты и комментарии, независимо, скрыты они или нет. По умолчанию лимит 100.</div>
            </div>
            <div class="block-filter">
               <div class="title-block-filter">Скрыть тип публикаций</div>
               <div class="body-block-filter flex">
                  <div class="title-block">Пост</div>
                  <div class="param-block">
                     <div class="check-mat-b check-m-on" data-type-public="post">
                        <div class="check-m-btn check-on" data-type-public="post" data-value="on" onclick="setTypePublic(this)"></div>
                     </div>
                  </div>
               </div>
               <div class="body-block-filter flex">
                  <div class="title-block">Комментарии</div>
                  <div class="param-block">
                     <div class="check-mat-b check-m-on" data-type-public="comment">
                        <div class="check-m-btn check-on" data-type-public="comment" data-value="on" onclick="setTypePublic(this)"></div>
                     </div>    
                  </div>
               </div>
               <div class="body-block-filter flex">
                  <div class="title-block">Репосты</div>
                  <div class="param-block">
                     <div class="check-mat-b check-m-on" data-type-public="share">
                        <div class="check-m-btn check-on" data-type-public="share" data-value="on" onclick="setTypePublic(this)"></div>
                     </div>   
                  </div>
               </div>
               <div class="descr-param">По умолчанию все включено. Обратите внимание! Данным фильтром лучше пользоваться, когда все публикации загружены.</div>
            </div>
            <div class="block-filter">
               <div class="title-block-filter">Новые публикации</div>
               <div class="body-block-filter flex">
                  <div class="title-block">Снизу/Сверху</div>
                  <div class="param-block">
                     <div class="check-mat-b check-m-on" data-type-public="top">
                        <div class="check-m-btn check-on" data-type-public="top" data-value="on" onclick="setTypePublic(this)"></div>
                     </div>  
                  </div>
               </div>
               <div class="descr-param">По умолчанию новые публикации показываются сверху.</div>
            </div>
            <div class="block-filter">
               <div class="title-block-filter">Скрыть публикации</div>
               <div class="body-block-filter flex">
                  <div class="title-block">Показать/Скрыть</div>
                  <div class="param-block">
                     <div class="check-mat-b check-m-on" data-type-public="show_public">
                        <div class="check-m-btn check-on" data-type-public="show_public" data-value="on" onclick="setTypePublic(this)"></div>
                     </div> 
                  </div>
               </div>
                <div class="descr-param">По умолчанию показываются.</div>
            </div>
         </div>
         <div class="loading block-md_ block none serf flex" id="serf">
           <span>Всего публикаций найдено - <span id="cnt">0</span>.</span> 
           <span id="close_connect" class="connect_close">Разорвать соединение</span>
         </div>
         <div class="loading block-md_ block none" id="analiz_block">
           <button class="button button-analiz" id="btn_analiz" onclick="analiz.start()">Запустить анализ публикаций</button>
           <div id="loading_sp" class="none">
              <div class="loading-spinner-s flex">
                <span class="loading-spinner-icon loading-spinner-icon-s"></span>
              </div>
            </div>
            <div class="analiz-block none" id="analiz_stats">
               <div class="analiz-block-title">Анализ публикаций</div>
               <div class="analiz-block-body">
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Всего постов:</div>
                     <div class="analiz-block-stats" id="analiz_post">0</div>
                  </div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Всего репостов:</div>
                     <div class="analiz-block-stats" id="analiz_share">0</div>
                  </div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Всего комментариев:</div>
                     <div class="analiz-block-stats" id="analiz_comments">0</div>
                  </div>
                  <div class="space"></div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Охват аудитории:</div>
                     <div class="analiz-block-stats" id="analiz_views">0</div>
                  </div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Общее количество "Мне нравится":</div>
                     <div class="analiz-block-stats" id="analiz_likes">0</div>
                  </div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Общее количество репостов:</div>
                     <div class="analiz-block-stats" id="analiz_reposts">0</div>
                  </div>
                  <div class="space"></div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Средний возраст аудитории(публикации пользователей):</div>
                     <div class="analiz-block-stats" id="analiz_years_">0</div>
                  </div>
                  <div class="analiz-block-p flex">
                     <div class="analiz-block-descr">Пол аудитории(ж, м в %):</div>
                     <div class="analiz-block-stats" id="analiz_sex">0</div>
                  </div>
               </div>
               <div class="analiz-footer">
                  <button class="button" onclick="analiz.start()">Обновить</button>
               </div>
            </div>
         </div>
         <div class="loading block-md_ block {loading_display}" id="loading_text">в поисках свежих публикаций ...</div>
         <div class="loading block-md_ block {preview_display}" id="preview_text">Укажите ключевые слова и тег.</div>
         <div id="main"></div>
      </section>
      <section id="tpl" class="none">
         <div class="template-container block-md_" data-type="{type}" data-num="{cnt}">
            <div class="template-header">
               <div class="template-title" id="tpl_title"><b>{event_type}</b></div>
            </div>
            <div class="template-body">
               <div data-body-text="data-body-text-{cnt}">{text}</div>
               {photo}
            </div>
            <div class="template-footer flex">
               <div>Дата публикации - {date}</div>
               <div>
                  <a href="javascript: return;" class="none button-footer-post button-spam" onclick="spam.addMSG({cnt})">спам</a>
                  <a href="{url}" class="button-footer-post" target="_blank">к публикации</a>
               </div>
            </div>
         </div>
      </section>
      <div class="pad"></div>
      <footer class="footer block-md_">
         <div class="footer-content flex">
            <div class="">
               <a href="https://vk.com/amandi.star" target="_blank">Артем Молодцов</a>
            </div>
            <div>
               <a href="http://vtreke.xyz" target="_blank">при поддержки vtreke.xyz</a>
            </div>
            <div class="">
               <a href="http://vk.com/cfshow" target="_blank">Группа ВКонтакте</a>
            </div>
         </div>
      </footer>
   </body>
   <script src="/vk-competition/tpl/common.js?5.13"></script>
</html>