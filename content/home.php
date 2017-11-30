<div id="home_content_left" style="float: left; width: calc(50% - 4px); min-width: calc(50% - 4px); height: 100%; min-height:100%; margin-top: 10px;">
  <div id="home_content_left_title" style="height: 30px; font-size: 22px; font-weight: bold; padding-left: 5%; padding-top: 10px;">Bald vorzubereiten:</div>
  <div id="home_content_left_orders" style="width: 100%; height: calc(100% - 55px); overflow: auto;"></div>
</div>
<div id="home_resizer" style="float: left; width: 8px; height: 100%; cursor: w-resize"></div>
<div id="home_content_right_top" style="float: left; width: calc(50% - 4px); min-width: calc(50% - 4px); min-height:50%; margin-top: 10px;">
  <div id="home_content_right_top_title" style="height: 30px; font-size: 22px; font-weight: bold; padding-left: 5%; padding-top: 10px;">Aktuell Erkannt:</div>
  <div id="home_content_right_top_order" style="width: 100%; height: calc(50% - 85px); overflow: auto;"></div>
  <div id="home_content_right_top_buttons" style="width: 100%;">
    <div id="home_content_right_top_enter" class="ambrosia_button border gray" style="float: right; margin-right: 5%">Code eingeben</div>
    <div id="home_content_right_top_taken" class="ambrosia_button border gray" style="float: right; margin-right: 20px">Abgeholt</div>
  </div>
</div>
<div id="home_content_right_bottom" style="float: left; width: calc(50% - 4px); min-width: calc(50% - 4px); min-height:50%; margin-top: 10px;">
  <div id="home_content_right_bottom_title" style="height: 30px; font-size: 22px; font-weight: bold; padding-left: 5%; padding-top: 10px;">Bald abzuholen:</div>
  <div id="home_content_right_bottom_orders" style="width: 100%; height: calc(50% - 55px); overflow: auto;"></div>
</div>
<script type="text/javascript">
function loadHomescreenWhenReady(){
    if (typeof homescreen_load!='undefined')
      homescreen_load()
    else
      setTimeout(loadHomescreenWhenReady, 100);
}
$(document).ready(loadHomescreenWhenReady);

let mpos;
function resize(e){
    let dx=mpos-e.x;
    mpos=e.x;
    let content_width=$("#main_content").width(),
        sidebar_width=$("#main_sidebar").width(),
        realpos=mpos-(sidebar_width+30)
    let leftperc=realpos/content_width*100<1?1:realpos/content_width*100>99?99:realpos/content_width*100,
        rightperc=100-leftperc
        
    history.pushState(null, null, '#'+leftperc);
    $("#home_content_left").css({
      "width": "calc("+leftperc+"% - 4px)",
      "min-width": "calc("+leftperc+"% - 4px)"
    })
    $("#home_content_right_top").css({
      "width": "calc("+rightperc+"% - 4px)",
      "min-width": "calc("+rightperc+"% - 4px)"
    })
    $("#home_content_right_bottom").css({
      "width": "calc("+rightperc+"% - 4px)",
      "min-width": "calc("+rightperc+"% - 4px)"
    })
}

let resize_el=document.getElementById("home_resizer");
resize_el.addEventListener("mousedown", function(e){
    mpos=e.x;
    document.addEventListener("mousemove", resize, false);
    $("#home_resizer").addClass("dragged")
}, false);
document.addEventListener("mouseup", function(){
    document.removeEventListener("mousemove", resize, false);
    $("#home_resizer").removeClass("dragged")
}, false);

let leftperc=window.location.hash.substr(1)==""?50:window.location.hash.substr(1),
    rightperc=100-leftperc
$("#home_content_left").css({
  "width": "calc("+leftperc+"% - 4px)",
  "min-width": "calc("+leftperc+"% - 4px)"
})
$("#home_content_right_top").css({
  "width": "calc("+rightperc+"% - 4px)",
  "min-width": "calc("+rightperc+"% - 4px)"
})
$("#home_content_right_bottom").css({
  "width": "calc("+rightperc+"% - 4px)",
  "min-width": "calc("+rightperc+"% - 4px)"
})
</script>