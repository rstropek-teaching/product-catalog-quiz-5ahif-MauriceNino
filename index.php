<?php
header('Access-Control-Allow-Origin: *');
session_start();
?>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="description" content="ProductView for products">
  <meta name="keywords" content="Products, View ">
  <meta name="viewport" content="width=device-width, initial-scale=0.7">
  <title>Product View</title>
  <link rel="shortcut icon" href="images/icon/main_icon.ico">
  <link rel="stylesheet" type="text/css" href="external/css/font-awesome.min.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <!-- Production code
  <link rel="stylesheet" type="text/css" href="external/css/style_compressed.css" />
  <script type="text/javascript" src="external/js/globalfunctions_compressed.js"></script>
  <script async type="text/javascript" src="external/js/pageresizer_compressed.js"></script>
  <script async type="text/javascript" src="external/js/menuctrl_compressed.js"></script>
  <script async type="text/javascript" src="external/js/buttonactions_compressed.js"></script>
  <script async type="text/javascript" src="external/js/homescreenmanager_compressed.js"></script>

  <!-- Dev Code -->
  <link rel="stylesheet" type="text/css" href="external/css/style.css" />
  <script type="text/javascript" src="external/js/globalfunctions.js"></script>
  <script async type="text/javascript" src="external/js/pageresizer.js"></script>
  <script async type="text/javascript" src="external/js/menuctrl.js"></script>
  <script async type="text/javascript" src="external/js/buttonactions.js"></script>
</head>
<body>
  <div id="main_screen" >
    <div id="dropdown_bg" style="width: 100%;"></div>
    <div id="popup_box_bg" style="width: 100%;"></div>
    <div id="popup_box">
      <table id="popup_box_table" style="width: 100%;">
        <tr id="popup_box_header" style="height: 100px">
          <td>
            <table style="width: 100%">
              <tr style="width: 100%">
                <td width="50px" style="float: right; padding-right: 20px">
                  <i id="popup_box_close_icon" class="fa fa-times"></i>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td id="popup_box_content" style="vertical-align: top;">

          </td>
        </tr>
      </table>
    </div>

    <div id="main_page">
      <nav id="main_header">
        <div id="main_topbar">
          <a id="main_topbar_heading" href="home" onclick="return false;">Product View Example</a>
          <div id="main_topbar_productsearch">
            <!-- Searchbar will be here -->
          </div>
          <div id="main_topbar_logo"></div>
        </div>
        <div id="main_sidebar">
          <ul class="sidebar_list">
            <?php
            $sidebar_items=file_get_contents(__DIR__."/content/sidebarlist_items.json");
            $sidebar_items_decode=json_decode($sidebar_items, true);
            for($i=0; $i<count($sidebar_items_decode); $i++){
              $icon=$sidebar_items_decode[$i]["icon"];
              $name=$sidebar_items_decode[$i]["a_name"];
              $desc=$sidebar_items_decode[$i]["a_desc"];
              $item='<li class="sidebar_list_item"><i class="fa %%ICON%% sidebar_list_item_icon"></i><a class="sidebar_list_a" href="%%NAME%%" onclick="return false;">%%DESC%%</a><i class="fa fa-chevron-right sidebar_list_item_arrow_right"></i></li>';
              $item=str_replace("%%ICON%%", $icon, $item);
              $item=str_replace("%%NAME%%", $name, $item);
              $item=str_replace("%%DESC%%", $desc, $item);
              echo $item;
            }
            ?>
<!--
            <li class="sidebar_list_item">
              <i class="fa fa-cutlery sidebar_list_item_icon"></i>
              <a class="sidebar_list_a" href="home" onclick="return false;">Bestellübersicht</a>
              <i class="fa fa-chevron-right sidebar_list_item_arrow_right"></i>
            </li>
            <li class="sidebar_list_item">
              <i class="fa fa-cog sidebar_list_item_icon"></i>
              <a class="sidebar_list_a" href="settings" onclick="return false;">Einstellungen</a>
              <i class="fa fa-chevron-right sidebar_list_item_arrow_right"></i>
            </li>
            <li class="sidebar_list_item">
              <i class="fa fa-users sidebar_list_item_icon"></i>
              <a class="sidebar_list_a" href="contacts" onclick="return false;">Kontakt</a>
              <i class="fa fa-chevron-right sidebar_list_item_arrow_right"></i>
            </li>-->
          </ul>
        </div>
        <div id="main_sidebar_button_container">
          <div id="main_sidebar_button" class="main_sidebar_button">
            <div id="main_sidebar_button_iconwrapper" class="trans">
              <i class="fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </nav>
      <div id="main_content">
        <script>
          function loadWhenReady(){
              if (typeof change_to_site!='undefined'){
                let site=get_url_search_var("site")
                if(site!==false)
                  change_to_site(site)
                else
                  change_to_site("home")
              }
              else
                setTimeout(loadWhenReady, 100);
          }
          $(document).ready(loadWhenReady);
        </script>
      </div>
      <div id="loading_gif" style="display:table-cell; vertical-align:middle; text-align:center; width: 100%; height: 100%; z-index: 9999">
        <img src="images/ajax-loader-2.svg" alt="Rip" style="position: fixed; top: 50%;left: 50%; margin-top: -125px; margin-left: -125px; height: 250px; width: 250px; z-index: 9999">
      </div>
    </div>
  </div>
</body>

</html>
