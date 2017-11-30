function change_to_site(new_site){
  if (last_site!=new_site&&new_site!="#"){
    $("#main_content").fadeOut(300, function(){
      $("#loading_gif").show(0)
      $("#main_content").load("content/"+new_site+".php", function(){
        //$("#loading_gif").hide(0)
        last_site=new_site
        $("#main_content").fadeIn(300)
        resize_listener()
        change_url_search_var("site", new_site)
      })
    })
    if(new_site!="home") clearInterval(updateInterval)
  }
}

let last_site
$(".sidebar_list_item").click(function(){
  let element=this
  change_to_site($(element).find("a").attr("href"))
})

popup_box_open=false
function open_popup_box(){
  $("#popup_box").fadeIn(300)
  $("#popup_box_bg").addClass("show")
  $("#popup_box_bg").animate({opacity:"0.5"},350)
  popup_box_open=true
}

function close_popup_box(){
  $("#popup_box").fadeOut()
  $("#popup_box_bg").removeClass("show")
  $("#popup_box_bg").animate({opacity:"0"},500)
  popup_box_open=false
}

function fill_popup_box(innerhtml){
  $("#popup_box_content").html(innerhtml)
}

function open_option_box(text, type, callbackname="", secondcallbackname=""){
  let html=""
  
    switch(type){
      case "YESNO":
        html+=`
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 25px; color: black; margin-left: auto; margin-right: auto; padding-left: 20px; padding-right: 20px;">`+text+`</div>
        </div>
        <div style="position: absolute; margin-top: 40px; left: 50%; transform: translate(-50%);">
          <div style="float: left; width: 70px;" class="ambrosia_button border" onclick="close_popup_box(); `+callbackname+`()">JA</div>
          <div style="float: left; margin-left: 20px; width: 70px;" class="ambrosia_button border" onclick="close_popup_box(); `+secondcallbackname+`();">NEIN</div>
        </div>
          <div style="margin-bottom: 120px;"></div>
        `
        break;
      case "RELOAD":
        html+=`
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 25px; color: black; margin-left: auto; margin-right: auto; padding-left: 20px; padding-right: 20px;">`+text+`</div>
        </div>
        <div style="position: absolute; margin-top: 40px; left: 50%; transform: translate(-50%);" class="ambrosia_button border" onclick="close_popup_box(); `+callbackname+`()">SEITE NEU LADEN</div>
        <div style="margin-bottom: 120px;"></div>
        `
        break;
      case "OK":
        html+=`
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 25px; color: black; margin-left: auto; margin-right: auto; padding-left: 20px; padding-right: 20px;">`+text+`</div>
        </div>
        <div style="position: absolute; margin-top: 40px; left: 50%; transform: translate(-50%);" class="ambrosia_button border" onclick="close_popup_box();">OK</div>
        <div style="margin-bottom: 120px;"></div>
        `
    }
    open_popup_box()
    fill_popup_box(html)
}

function raise_error(error, type, callbackname=""){
  open_option_box(error, type, callbackname)
}